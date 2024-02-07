import { getDocs, query, where, collection, Timestamp } from 'firebase/firestore';
import firebase from '../config/firebase/firebase';
import { TimeRange } from './getTicketCounts';
import { LineGraphDataType } from '@/constants/sales.constants';
import { TicketDataI } from './CheckStatusTicket';
import { groupBy } from 'lodash';


export const getSalesData = async (timeRange: TimeRange): Promise<{ salesData: LineGraphDataType[], totalAmount: number }> => {
  const startDate = calculateStartDate(timeRange);
  const endDate = new Date();

  try {
    const ticketData = await fetchTicketData(startDate, endDate);
    return processTicketData(ticketData, timeRange);
  } catch (error) {
    console.error('Error fetching ticket data:', error);
    throw error;
  }
};

const calculateStartDate = (timeRange: TimeRange): Date => {
  const currentDate = new Date();

  switch (timeRange) {
    case 'TODAY':
      return new Date(currentDate.setHours(0, 0, 0, 0));
    case 'LAST_WEEK':
      return new Date(currentDate.setDate(currentDate.getDate() - 7));
    case 'LAST_MONTH':
      return new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    default:
      throw new Error('Invalid time range');
  }
};

const fetchTicketData = async (startDate: Date, endDate: Date) => {
  const ticketsRef = collection(firebase.db, 'tickets');
  const q = query(ticketsRef, where('createdAt', '>=', startDate), where('createdAt', '<=', endDate));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as TicketDataI);
};

const processTicketData = (ticketData: TicketDataI[], timeRange: TimeRange): { salesData: LineGraphDataType[], totalAmount: number } => {
  let groupedData: { [key: string]: TicketDataI[] } = {};

  if (timeRange === 'TODAY') {
    // Group ticket data by hour
    groupedData = groupBy(ticketData, (ticket) => {
      const ticketDate = ticket.createdAt.toDate();
      return ticketDate.getHours();
    });

    // Fill in missing hours with default data point
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    for (let hour = 0; hour <= currentHour; hour++) {
      if (!groupedData[hour.toString()]) {
        groupedData[hour.toString()] = [];
      }
    }
  } else {
    // Group ticket data by day
    groupedData = groupBy(ticketData, (ticket) => {
      const ticketDate = ticket.createdAt.toDate();
      return ticketDate.toDateString(); // Group by day
    });

    // Calculate start date for filling in missing days
    let startDate = new Date();
    if (timeRange === 'LAST_WEEK') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeRange === 'LAST_MONTH') {
      startDate.setMonth(startDate.getMonth() - 1);
    }

   // Fill in missing days with default data point
    const endDate = new Date();
    let currentDate = new Date(startDate); // Clone startDate
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    while (currentDate <= endDate) {
      const dateString = currentDate.toDateString();
      if (!groupedData[dateString]) {
        groupedData[dateString] = [];
      }
      currentDate = new Date(currentDate.getTime() + oneDay); // Move to the next day
    }
  }

  // Map grouped data to LineGraphDataType
  const salesData: LineGraphDataType[] = [];

  // If no ticket data available for today, add default data points for each hour
  if (timeRange === 'TODAY' && Object.keys(groupedData).length === 0) {
    const currentDate = new Date();
    for (let hour = 0; hour < 24; hour++) {
      const ticketDate = new Date(currentDate);
      ticketDate.setHours(hour, 0, 0, 0);
      salesData.push({
        y: 0,
        x: ticketDate.getTime(),
        extraData: {
          formattedValue: '0 tickets',
          formattedAmountPeople: '0',
          formattedTime: `${hour.toString().padStart(2, '0')}:00`,
          formattedDate: formatDate(Timestamp.fromDate(ticketDate)),
        },
      });
    }
  }

  // Iterate through grouped data and populate salesData
  for (const key in groupedData) {
    if (groupedData.hasOwnProperty(key)) {
      const tickets = groupedData[key];
      const totalCount = tickets.length > 0 ? tickets.length : 0;
      const createdAt = tickets.length > 0 ? tickets[0].createdAt : timeRange=='TODAY' ? Timestamp.fromDate(new Date()) : Timestamp.fromDate(new Date(key.toString())); 

      salesData.push({
        y: totalCount,
        x: createdAt.toMillis(),
        extraData: {
          formattedValue: `${totalCount} tickets`,
          formattedAmountPeople: `${totalCount}`, // Assuming 1 ticket per entry
          formattedTime: timeRange === 'TODAY' ? `${key.toString().padStart(2, '0')}:00` : '', // Add hour for today's data
          formattedDate: formatDate(createdAt),
        },
      });
    }
  }

  salesData.sort((a, b) => a.x - b.x);
  const totalAmount = Object.values(groupedData).reduce((total, tickets) => total + tickets.length, 0);
  return { salesData, totalAmount };
};



const formatTimeString = (date: Timestamp): string => {
  const ticketDate = date.toDate();
  return `${ticketDate.getHours()}:${ticketDate.getMinutes() < 10 ? '0' : ''}${ticketDate.getMinutes()}`;
};

const formatDate = (date: Timestamp): string => {
  const ticketDate = date.toDate();
  return formatDateString(ticketDate.toISOString());
};

const formatDateString = (inputDate: string): string => {
  const dateObject = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  return dateObject.toLocaleDateString('es-ES', options);
};

