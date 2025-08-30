import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getAllEvents } from "../services/EventService";
import type { IEvent } from "../interfaces/eventInterface";
import LoadingSpinner from "./LoadingSpinner";

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleEvents = showMore
    ? events
    : isMobile
    ? events.slice(0, 4)
    : events.slice(0, 12);

  const shouldShowMoreButton = isMobile
    ? events.length > 4
    : events.length > 12;

  return (
    <div className="w-full p-3 md:px-20 md:pt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 md:gap-y-18">
        {loading ? (
          <LoadingSpinner />
        ) : events.length === 0 ? (
          <p className="flex items-center justify-center text-4xl col-span-full">
            No events created yet
          </p>
        ) : (
          visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              eventTitle={event.eventTitle}
              eventVenue={event.eventVenue}
              eventPricingCategory={event.eventPricing}
              eventBannerUrl={event.eventBanner}
              eventStartDate={event.eventStartDate}
            />
          ))
        )}
      </div>

      {!loading && shouldShowMoreButton && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;
