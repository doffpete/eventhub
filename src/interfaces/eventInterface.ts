import type { Dayjs } from "dayjs";

export interface IEvent {
  id: string;
  eventTitle: string;
  eventVenue: string;
  eventPricing: string;
  eventBanner: string;
  eventStartDate: Dayjs | null;
  eventType: string;
}
