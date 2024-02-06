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
