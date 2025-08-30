// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHeart,
  faCalendarDays,
  faGlobe,
  faFaceSmile,
  faMusic,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const eventCategories = [
  { label: "Music", icon: faMusic },
  { label: "Nightlife", icon: faGlobe },
  { label: "Performing & Visual Arts", icon: faFaceSmile },
  { label: "Holiday", icon: faCalendarDays },
  { label: "Dating", icon: faHeart },
  { label: "Hobbies", icon: faGamepad },
  { label: "Business", icon: faBook },
];

const EventGroups = () => {
  return (
    <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-3 items-center text-center md:flex md:flex-row md:justify-between">
      {eventCategories.map((eventCategory, index) => (
        <div key={index} className="flex flex-col items-center group">
          <span className="flex rounded-full border border-gray-300 justify-center cursor-pointer items-center h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 group-hover:bg-gray-300 text-center">
            <FontAwesomeIcon
              icon={eventCategory.icon}
              className="text-gray-950 text-2xl sm:text-3xl md:text-4xl"
            />
          </span>
          <p className="text-sm sm:text-md mt-2 h-10 flex items-center justify-center text-center leading-tight">
            {eventCategory.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventGroups;
