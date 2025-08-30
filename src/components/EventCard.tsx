import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import type { Dayjs } from "dayjs";

interface IEventCard {
  eventTitle: string;
  eventVenue: string;
  eventPricingCategory: string;
  eventBannerUrl: string;
  eventStartDate: Dayjs | null;
}

const EventCard = ({
  eventTitle,
  eventVenue,
  eventPricingCategory,
  eventStartDate,
  eventBannerUrl,
}: IEventCard) => {
  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <div className="flex flex-col bg-white hover:bg-[#ffffff] border border-gray-300 md:border-none rounded-2xl hover:shadow-md overflow-hidden">
        <div className="cursor-pointer">
          <img
            src={eventBannerUrl}
            alt={`${eventTitle} banner`}
            className="w-full object-cover h-56"
          />
        </div>
        <div className="border border-[#e6ecec] px-1"></div>
        <div className="p-4 flex flex-col gap-3 flex-grow items-center md:items-start">
          <button className="cursor-pointer">
            <p className="text-xl font-bold text-gray-800">
              {toTitleCase(eventTitle)}
            </p>
          </button>
          <p className="text-sm font-normal text-gray-600  overflow-scroll">
            {eventStartDate?.isValid()
              ? eventStartDate.format("MMMM D, YYYY h:mm A")
              : "No date"}
          </p>
          <p className="text-sm font-normal text-gray-600  overflow-scroll">
            {eventVenue}
          </p>
          <span className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faTag} className="text-gray-950 text-lg" />
            <p>{eventPricingCategory}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
