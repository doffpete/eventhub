import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IEvent } from "../interfaces/eventInterface";

const SearchEventCard = ({ event }: { event: IEvent }) => (
  <div className="md:w-full flex flex-row md:gap-5 md:p-4 bg-gray-50 hover:bg-[#ffffff] rounded-2xl hover:shadow-md">
    <div className="cursor-pointer md:w-1/4 bg-gray-200 w-full">
      <img
        src={event.eventBanner}
        alt={`${event.eventTitle} banner`}
        className="md:w-full md:object-cover md:h-36 h-full object-contain"
      />
    </div>
    <div className="p-1 flex flex-col gap-3 flex-grow items-center md:items-start">
      <button className="cursor-pointer">
        <p className="text-xl font-bold text-gray-800">{event.eventTitle}</p>
      </button>
      <p className="text-sm font-normal text-gray-600  overflow-scroll">
        {event.eventStartDate?.isValid()
          ? event.eventStartDate.format("MMMM D, YYYY h:mm A")
          : "No date"}
      </p>
      <p className="text-sm font-normal text-gray-600 overflow-scroll">
        {event.eventVenue}
      </p>
      <span className="flex flex-row items-center gap-2">
        <FontAwesomeIcon icon={faTag} className="text-gray-950 text-lg" />
        <p>{event.eventPricing}</p>
      </span>
    </div>
  </div>
);

export default SearchEventCard;
