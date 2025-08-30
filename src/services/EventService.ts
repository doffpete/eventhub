import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

const EventService = () => {};

const EVENTS_COLLECTION =
  import.meta.env.MODE === "production" ? "events" : "events_dev";

export const getAllEvents = async () => {
  const eventQuery = query(
    collection(db, EVENTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(eventQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    eventTitle: doc.data().eventTitle,
    eventStartDate: dayjs(doc.data().startDate.toDate()),
    eventVenue: doc.data().eventVenue,
    eventPricing: doc.data().eventPricing,
    eventBanner: doc.data().eventBanner,
    eventType: doc.data().eventType,
    ...doc.data(),
  }));
};

export default EventService;
