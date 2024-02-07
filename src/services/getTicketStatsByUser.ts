import { collection, query, where, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import firebase from "../config/firebase/firebase";
import { UserDataI } from "./fetchUserData";
import { TicketDataI } from "./CheckStatusTicket";
import { TimeRange } from "./getTicketCounts";


export interface TicketStats {
  user: UserDataI;
  ticketCount: number;
}

const getStartTimestamp = (timeRange: TimeRange): Timestamp => {
  const now = Timestamp.now().toDate();
  switch (timeRange) {
    case "TODAY":
      return Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    case "LAST_WEEK":
      const lastWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      return Timestamp.fromDate(lastWeekStart);
    case "LAST_MONTH":
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      return Timestamp.fromDate(lastMonthStart);
    default:
      throw new Error("Invalid time range");
  }
};

export const getTicketStatsByUser = async (timeRange: TimeRange): Promise<{ generatedByStats: TicketStats[] | [], scanByStats: TicketStats[] | [] }> => {
  try {
    const startTimestamp = getStartTimestamp(timeRange);
    const endTimestamp = Timestamp.now();

    const ticketsRef = collection(firebase.db, 'tickets');

    // Query tickets within the specified time range
    const q = query(ticketsRef, where('createdAt', '>=', startTimestamp), where('createdAt', '<=', endTimestamp));
    const querySnapshot = await getDocs(q);

    // Initialize an object to store ticket counts by user
    const generatedByStatsMap: Map<string, number> = new Map();
    const scanByStatsMap: Map<string, number> = new Map();

    // Iterate over the tickets to populate the stats maps
    querySnapshot.forEach((doc) => {
      const ticketData: TicketDataI = doc.data() as TicketDataI;

      // Update generatedBy stats
      if (ticketData.generatedBy) {
        const generatedByCount = generatedByStatsMap.get(ticketData.generatedBy) || 0;
        generatedByStatsMap.set(ticketData.generatedBy, generatedByCount + 1);
      }

      // Update scanBy stats
      if (ticketData.scanBy) {
        const scanByCount = scanByStatsMap.get(ticketData.scanBy) || 0;
        scanByStatsMap.set(ticketData.scanBy, scanByCount + 1);
      }
    });

    // Fetch user details and construct TicketStats objects
    const generatedByStatsPromises = Array.from(generatedByStatsMap.keys()).map(async (userId) => {
      const userDoc = await getDoc(doc(firebase.db, 'users', userId));
      const userData = userDoc.data() as UserDataI;
      return { user: userData, ticketCount: generatedByStatsMap.get(userId) || 0 };
    });

    const scanByStatsPromises = Array.from(scanByStatsMap.keys()).map(async (userId) => {
      const userDoc = await getDoc(doc(firebase.db, 'users', userId));
      const userData = userDoc.data() as UserDataI;
      return { user: userData, ticketCount: scanByStatsMap.get(userId) || 0 };
    });

    // Wait for all promises to resolve
    const generatedByStats = await Promise.all(generatedByStatsPromises);
    const scanByStats = await Promise.all(scanByStatsPromises);

    return { generatedByStats, scanByStats };
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    return { generatedByStats: [], scanByStats: [] };
  }
};