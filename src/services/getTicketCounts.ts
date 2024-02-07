import { query, collection, where, getDocs } from 'firebase/firestore';
import firebase from '../config/firebase/firebase';

export type TimeRange = 'TODAY' | 'LAST_WEEK' | 'LAST_MONTH';

interface TicketCount {
  totalTickets: number;
  scannedTickets: number;
}

export const getTicketCounts = async (timeRange: TimeRange): Promise<TicketCount> => {
  try {
    const ticketsRef = collection(firebase.db, 'tickets');
    const currentDate = new Date();

    let startDate: Date;

    switch (timeRange) {
      case 'TODAY':
        startDate = currentDate;
        break;
      case 'LAST_WEEK':
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);
        break;
      case 'LAST_MONTH':
        startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      default:
        throw new Error('Invalid time range');
    }

    const q = query(
      ticketsRef,
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', currentDate)
    );

    const querySnapshot = await getDocs(q);

    const ticketCount: TicketCount = {
      totalTickets: querySnapshot.size,
      scannedTickets: querySnapshot.docs.filter((doc) => doc.data().isAlreadyScan).length,
    };

    return ticketCount;
  } catch (error) {
    console.error('Error fetching ticket counts:', error);
    throw error;
  }
};
