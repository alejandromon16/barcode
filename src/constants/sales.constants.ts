import { TimeRange } from "@/services/getTicketCounts";

function formatDateString(inputDate): string {
  const dateObject = new Date(inputDate);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDateString = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm} ${dateObject.toLocaleDateString("en-US")}`;

  return formattedDateString;
}

export interface LineGraphDataType {
  y: number;
  x: number; 
  extraData: {
    formattedValue: string;
    formattedAmountPeople: string;
    formattedTime: string;
    formattedDate: string;
  };
}

export const SALESTODAY: LineGraphDataType[] = [
  {
    y: 10,
    x: new Date("2020-01-01T03:00:00").getTime(),
    extraData: {
      formattedValue: "30 Bs",
      formattedAmountPeople: "10",
      formattedTime: "05:00",
      formattedDate: `${formatDateString("2020-01-01T03:00:00")}`,
    },
  },
  {
    y: 40,
    x: new Date("2020-01-01T04:00:00").getTime(),
    extraData: {
      formattedValue: "120 Bs",
      formattedAmountPeople: "40",
      formattedTime: "05:00",
      formattedDate: `${formatDateString("2020-01-01T04:00:00")}`,
    },
  },
  {
    y: 30,
    x: new Date("2020-01-01T05:00:00").getTime(),
    extraData: {
      formattedValue: "90 Bs",
      formattedAmountPeople: "30",
      formattedTime: "05:00",
      formattedDate: `${formatDateString("2020-01-01T05:00:00")}`,
    },
  },
  {
    y: 100,
    x: new Date("2020-01-01T06:00:00").getTime(),
    extraData: {
      formattedValue: "300 Bs",
      formattedAmountPeople: "100",
      formattedTime: "06:00",
      formattedDate: `${formatDateString("2020-01-01T06:00:00")}`,
    },
  },
  {
    y: 50,
    x: new Date("2020-01-01T07:00:00").getTime(),
    extraData: {
      formattedValue: "150 Bs",
      formattedAmountPeople: "50",
      formattedTime: "07:00",
      formattedDate: `${formatDateString("2020-01-01T07:00:00")}`,
    },
  },
  {
    y: 10,
    x: new Date("2020-01-01T08:00:00").getTime(),
    extraData: {
      formattedValue: "30 Bs",
      formattedAmountPeople: "10",
      formattedTime: "08:00",
      formattedDate: `${formatDateString("2020-01-01T08:00:00")}`,
    },
  },
  {
    y: 15,
    x: new Date("2020-01-01T09:00:00").getTime(),
    extraData: {
      formattedValue: "45 Bs",
      formattedAmountPeople: "15",
      formattedTime: "09:00",
      formattedDate: `${formatDateString("2020-01-01T09:00:00")}`,
    },
  },
  {
    y: 230,
    x: new Date("2020-01-01T10:00:00").getTime(),
    extraData: {
      formattedValue: "690 Bs",
      formattedAmountPeople: "230",
      formattedTime: "10:00",
      formattedDate: `${formatDateString("2020-01-01T10:00:00")}`,
    },
  },
  {
    y: 250,
    x: new Date("2020-01-01T11:00:00").getTime(),
    extraData: {
      formattedValue: "750 Bs",
      formattedAmountPeople: "250",
      formattedTime: "11:00",
      formattedDate: `${formatDateString("2020-01-01T11:00:00")}`,
    },
  },
];

const formatDateString2 = (inputDate: string): string => {
  const dateObject = new Date(inputDate);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedDateString = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  return formattedDateString;
};

const getTicketsPerHour = (timeRange: TimeRange): LineGraphDataType[] => {
  let data: LineGraphDataType[] = [];
  switch (timeRange) {
    case 'TODAY':
      data = SALESTODAY;
      break;
    case 'LAST_WEEK':
      // Assuming SALESTODAY contains data for the last week
      data = SALESTODAY.filter(item => item.x >= new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
      break;
    case 'LAST_MONTH':
      // Assuming SALESTODAY contains data for the last month
      data = SALESTODAY.filter(item => item.x >= new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
      break;
    default:
      throw new Error('Invalid time range');
  }

  return data.map(item => ({
    y: item.y,
    x: item.x,
    extraData: {
      formattedValue: item.extraData.formattedValue,
      formattedAmountPeople: item.extraData.formattedAmountPeople,
      formattedTime: item.extraData.formattedTime,
      formattedDate: formatDateString(new Date(item.x).toISOString())
    }
  }));
};