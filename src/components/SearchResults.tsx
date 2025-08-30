import {
  faBook,
  faGamepad,
  faGlobe,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioButtonGroup from "./RadioButtonGroup";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/EventService";
import type { IEvent } from "../interfaces/eventInterface";
import dayjs from "dayjs";
import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  addDays,
  addWeeks,
  addMonths,
} from "date-fns";
import LoadingSpinner from "./LoadingSpinner";
import SearchEventCard from "./SearchEventCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const eventTypeOptions = [
  { label: "Online", value: "online" },
  { label: "Physical", value: "physical" },
];

const eventPricingOptions = [
  { label: "Paid", value: "paid" },
  { label: "Free", value: "free" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Weekend", value: "weekend" },
  { label: "This Month", value: "thisMonth" },
  { label: "This Week", value: "thisWeek" },
  { label: "Next Week", value: "nextWeek" },
  { label: "Next Month", value: "nextMonth" },
];

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(Boolean);
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedEventPriceFilter, setSelectedEventPriceFilter] = useState("");
  const [selectedEventTypeFilter, setSelectedEventTypeFilter] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const events = await getAllEvents();
        setAllEvents(events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    const words = q.split(" ");
    const now = new Date();
    const results = allEvents.filter((event) => {
      const text = `${event.eventTitle} ${event.eventVenue}`.toLowerCase();

      // Search term match
      const matchQuery = words.every((word) => text.includes(word));
      if (!matchQuery) return false;

      // Price filter
      if (selectedEventPriceFilter) {
        if (
          event.eventPricing.toLowerCase() !==
          selectedEventPriceFilter.toLowerCase()
        ) {
          return false;
        }
      }

      // Type filter
      if (selectedEventTypeFilter) {
        if (
          event.eventType.toLowerCase() !==
          selectedEventTypeFilter.toLowerCase()
        ) {
          return false;
        }
      }
      const eventDate = dayjs(event.eventStartDate).toDate();

      switch (selectedDateFilter) {
        case "today":
          return isSameDay(eventDate, now);
        case "tomorrow":
          return isSameDay(eventDate, addDays(now, 1));
        case "weekend":
          return [6, 0].includes(eventDate.getDay());
        case "thisWeek":
          return isSameWeek(eventDate, now);
        case "nextWeek":
          return isSameWeek(eventDate, addWeeks(now, 1));
        case "thisMonth":
          return isSameMonth(eventDate, now);
        case "nextMonth":
          return isSameMonth(eventDate, addMonths(now, 1));
        default:
          return true;
      }
    });
    setFilteredEvents(results);
  }, [
    query,
    allEvents,
    selectedDateFilter,
    selectedEventPriceFilter,
    selectedEventTypeFilter,
  ]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateFilter(event.target.value);
  };

  const handlePricingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEventPriceFilter(event.target.value);
  };

  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedEventTypeFilter(event.target.value);
  };

  const normalizeSearch = (input: string) => {
    const trimmed = input.trim().toLowerCase();

    if (trimmed.endsWith("events")) {
      return trimmed;
    } else {
      return `${trimmed} events`;
    }
  };
  return (
    <div className="w-full min-h-[100vh] flex flex-col p-3 md:p-5 gap-8 items-start">
      <div className="pt-18 md:pt-8 text-gray-800 text-sm">
        <Link to={"/"} className="text-blue-600 underline">
          Home
        </Link>{" "}
        / <span className="text-gray-600">{query}</span>
      </div>

      <p className="text-2xl font-bold text-gray-700">
        Search results for:{" "}
        <span className="text-gray-400 italic">{normalizeSearch(query)}</span>
      </p>

      <div className="w-full md:w-4/5 flex flex-row md:gap-8 gap-3 items-start md:bg-white bg-gray-400">
        <div className="w-1/4 md:self-stretch flex flex-col gap-12 md:bg-gray-100 items-start">
          <p className="text-xl font-bold text-gray-800">Filters</p>
          <div className="flex flex-col gap-2">
            <label>Category</label>
            <ul className="flex flex-col gap-2">
              <div className="flex flex-row gap-3">
                <span className="flex rounded-full border border-gray-300 justify-center items-center h-6 w-6 text-center">
                  <FontAwesomeIcon
                    icon={faMusic}
                    className="text-gray-950 text-sm"
                  />
                </span>
                <p className="text-md ">Music</p>
              </div>
              <div className="flex flex-row gap-3">
                <span className="flex rounded-full border border-gray-300 justify-center items-center h-6 w-6 text-center">
                  <FontAwesomeIcon
                    icon={faGamepad}
                    className="text-gray-950 text-sm"
                  />
                </span>
                <p className="text-md ">Hobbies</p>
              </div>
              <div className="flex flex-row gap-3">
                <span className="flex rounded-full border border-gray-300 justify-center items-center h-6 w-6 text-center">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-gray-950 text-sm"
                  />
                </span>
                <p className="text-md">Business</p>
              </div>
              <div className="flex flex-row gap-3">
                <span className="flex rounded-full border border-gray-300 justify-center items-center h-6 w-6 text-center">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="text-gray-950 text-sm"
                  />
                </span>
                <p className="text-md">Nightlife</p>
              </div>
            </ul>
          </div>
          <div className="flex flex-col  md:gap-2 gap-4">
            <label className="items-start">Date</label>
            <RadioButtonGroup
              row={false}
              value={selectedDateFilter}
              handleChange={handleDateChange}
              options={dateOptions}
            ></RadioButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <label>Pricing</label>
            <RadioButtonGroup
              row={false}
              value={selectedEventPriceFilter}
              handleChange={handlePricingChange}
              options={eventPricingOptions}
            ></RadioButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <label>Type</label>
            <RadioButtonGroup
              row={false}
              value={selectedEventTypeFilter}
              handleChange={handleEventTypeChange}
              options={eventTypeOptions}
            ></RadioButtonGroup>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 md:self-stretch">
          <div className="flex flex-row gap-3 items-center cursor-pointer">
            {selectedDateFilter && (
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {selectedDateFilter}
                <button
                  onClick={() => setSelectedDateFilter("")}
                  className="cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}{" "}
            {selectedEventTypeFilter && (
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {selectedEventTypeFilter}
                <button
                  onClick={() => setSelectedEventTypeFilter("")}
                  className="cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedEventPriceFilter && (
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {selectedEventPriceFilter}
                <button
                  onClick={() => setSelectedEventPriceFilter("")}
                  className="cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {(selectedDateFilter ||
              selectedEventTypeFilter ||
              selectedEventPriceFilter) && (
              <button
                onClick={() => {
                  setSelectedDateFilter("");
                  setSelectedEventTypeFilter("");
                  setSelectedEventPriceFilter("");
                }}
                className="ml-auto text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="w-full flex flex-col gap-4 md:px-2 items-center rounded-2xl">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <SearchEventCard key={event.id} event={event} />
                ))
              ) : query ? (
                <>
                  <div className="w-full text-lg font-bold text-red-400 mb-4 text-center border border-red-50 bg-red-100 p-4 md:bg-gray-100">
                    Oops!! <br></br>Nothing matched your search, check out these
                    options.
                  </div>
                  {allEvents.map((event) => (
                    <SearchEventCard key={event.id} event={event} />
                  ))}
                </>
              ) : (
                allEvents.map((event) => (
                  <SearchEventCard key={event.id} event={event} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
