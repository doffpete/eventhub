import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import RadioButtonGroup from "./RadioButtonGroup";
import ImageUpload from "./ImageUpload";
import {
  Controller,
  useForm,
  type DefaultValues,
  type SubmitHandler,
} from "react-hook-form";
import { useAuth } from "../auth/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

interface ICreateEventForm {
  eventTitle: string;
  description: string;
  eventType: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  eventVenue: string;
  eventOrganizer: string;
  eventBanner: File | null;
  eventPricingCategory: string;
}

const defaultValues: DefaultValues<ICreateEventForm> = {
  eventTitle: "",
  description: "",
  eventType: "",
  startDate: dayjs(null),
  endDate: dayjs(null),
  eventVenue: "",
  eventOrganizer: "",
  eventBanner: null,
  eventPricingCategory: "",
};

const CreateEvents = () => {
  const form = useForm<ICreateEventForm>({ defaultValues, mode: "onChange" });
  const { register, control, formState, handleSubmit, reset, setValue, watch } =
    form;
  const { isDirty, isValid, isSubmitting, errors } = formState;

  const { user } = useAuth();
  const watchEventBanner = watch("eventBanner");
  const watchStartDate = watch("startDate");

  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const handleFileFromChild = (file: File | null) => {
    if (file) {
      setValue("eventBanner", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("eventBanner", null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const eventTypeOptions = [
    { label: "Online", value: "online" },
    { label: "Physical", value: "physical" },
  ];

  const eventPricingOptions = [
    { label: "Paid", value: "paid" },
    { label: "Free", value: "free" },
  ];

  const onSubmit: SubmitHandler<ICreateEventForm> = async (
    data: ICreateEventForm
  ) => {
    try {
      if (!user?.uid) return;

      const eventId = uuidv4();

      const EVENTS_COLLECTION =
        import.meta.env.MODE === "production" ? "events" : "events_dev";

      let bannerUrl = "";
      if (data.eventBanner) {
        const bannerRef = ref(
          storage,
          `event-banners/${user.uid}/${eventId}/${data.eventBanner.name}`
        );

        try {
          await uploadBytes(bannerRef, data.eventBanner);
          bannerUrl = await getDownloadURL(bannerRef);
        } catch (error) {
          showBoundary(error);
          return;
        }
      }
      if (data.eventBanner) {
        const formData = new FormData();
        formData.append("file", data.eventBanner);
        formData.append("upload_preset", "unsigned preset");

        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dn8o8lwrq/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!res.ok) {
            throw new Error("Failed to upload image to Cloudinary");
          }

          const uploadResult = await res.json();
          bannerUrl = uploadResult.secure_url;
        } catch (error) {
          showBoundary(error);
          return;
        }
      }

      await setDoc(doc(db, EVENTS_COLLECTION, eventId), {
        eventTitle: data.eventTitle,
        description: data.description,
        eventType: data.eventType,
        startDate: data.startDate?.toDate(),
        endDate: data.endDate?.toDate(),
        eventVenue: data.eventVenue,
        eventOrganizer: data.eventOrganizer,
        eventBanner: bannerUrl,
        eventPricing: data.eventPricingCategory,
        createdAt: new Date(),
        createdBy: user.uid,
      });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        showBoundary(error);
      } else {
        showBoundary(error);
      }
    } finally {
      reset();
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center min-h-[100vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-4/5 flex flex-col max-h-[85vh] pt-8 md:pt-0 gap-4 p-5 md:pl-12 items-center md:rounded-2xl bg-gray-200 overflow-auto"
        >
          <div className="items-start pt-4 md:pt-0">
            <h1 className="text-2xl text-gray-500 font-bold">
              Create New Event
            </h1>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-24 pt-5">
            <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventTitle"
                  className="font-medium text-sm text-gray-500"
                >
                  Event Title
                </label>
                <div className="border border-gray-400 px-5 py-3 rounded-2xl">
                  <input
                    id="eventTitle"
                    type="text"
                    placeholder="Enter event title"
                    className="py-2 outline-none text-gray-700 text-sm w-full"
                    {...register("eventTitle", {
                      required: "Event title is required",
                    })}
                  />
                  {errors.eventTitle && (
                    <p className="text-red-500 text-sm">
                      {errors.eventTitle.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="font-medium text-sm text-gray-500"
                >
                  Description
                </label>
                <div className="border border-gray-400 px-5 py-3 rounded-2xl">
                  <textarea
                    id="description"
                    placeholder="Enter Description"
                    className="w-full resize-none outline-none text-gray-700 text-sm py-2 bg-transparent"
                    rows={4}
                    {...register("description", {
                      required: "Event Description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventType"
                  className="font-medium text-sm text-gray-500"
                >
                  Event Type
                </label>
                <div className="border border-gray-400 px-5 py-3 rounded-2xl">
                  <Controller
                    name="eventType"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                      <RadioButtonGroup
                        {...field}
                        row={true}
                        value={field.value}
                        options={eventTypeOptions}
                        handleChange={(val) => {
                          field.onChange(val);
                          field.onBlur();
                        }}
                      />
                    )}
                  ></Controller>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="startDate"
                  className="font-medium text-sm text-gray-500"
                >
                  StartDate/Time:
                </label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{
                    required: "Start date is required",
                    validate: (startDate) => {
                      if (!startDate) return "Start date is required";
                      return dayjs(startDate).isAfter(dayjs())
                        ? true
                        : "Start date must be after current date";
                    },
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          value={field.value}
                          onChange={(Date) => (
                            field.onChange(Date), field.onBlur()
                          )}
                          slotProps={{
                            textField: {
                              error: !!errors.startDate,
                              helperText: errors.startDate?.message,
                              size: "small",
                              fullWidth: true,
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                ></Controller>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="endDate"
                  className="font-medium text-sm text-gray-500"
                >
                  EndDate/Time:
                </label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: "End date is required",
                    validate: (endDate) => {
                      const start = dayjs(watchStartDate);
                      const end = dayjs(endDate);
                      if (!endDate || !watchStartDate) return true;

                      return end.isAfter(start)
                        ? true
                        : "End date must be after the start date";
                    },
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          {...field}
                          value={field.value}
                          onChange={(date) => (
                            field.onChange(date), field.onBlur()
                          )}
                          slotProps={{
                            textField: {
                              error: !!errors.endDate,
                              helperText: errors.endDate?.message,
                              size: "small",
                              fullWidth: true,
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                ></Controller>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4 items-center">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventVenue"
                  className="font-medium text-sm text-gray-500"
                >
                  Event Venue/Link(for online event)
                </label>
                <div className="w-full border border-gray-400 px-5 py-3 rounded-2xl">
                  <input
                    type="text"
                    placeholder="Enter event venue or meeting link"
                    className="py-2 outline-none text-gray-700 text-sm w-full"
                    {...register("eventVenue", {
                      required: "Event Venue is required",
                    })}
                  />
                  {errors.eventVenue && (
                    <p className="text-red-500 text-sm">
                      {errors.eventVenue.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventOrganizer"
                  className="font-medium text-sm text-gray-500"
                >
                  Event Organizer
                </label>
                <div className="border border-gray-400 px-5 py-3 rounded-2xl">
                  <input
                    type="text"
                    placeholder="Enter Organizer's name"
                    className="py-2 outline-none text-gray-700 text-sm w-full"
                    {...register("eventOrganizer", {
                      required: "Organizer's name is required",
                    })}
                  />
                  {errors.eventOrganizer && (
                    <p className="text-red-500 text-sm">
                      {errors.eventOrganizer.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventBanner"
                  className="font-medium text-sm text-gray-500"
                >
                  Event Banner/Flyer
                </label>
                <Controller
                  name="eventBanner"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      onFileChange={handleFileFromChild}
                      {...field}
                    />
                  )}
                ></Controller>
                {errors.eventBanner && (
                  <p className="text-red-500 text-sm">
                    {errors.eventBanner.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="eventAccessCategory"
                  className="font-medium text-sm text-gray-500"
                >
                  Paid Event?
                </label>
                <div className="border border-gray-400 px-5 py-3 rounded-2xl">
                  <Controller
                    name="eventPricingCategory"
                    control={control}
                    rules={{ required: "Event access catgory is required" }}
                    render={({ field }) => (
                      <RadioButtonGroup
                        {...field}
                        row={true}
                        value={field.value}
                        options={eventPricingOptions}
                        handleChange={(val) => {
                          field.onChange(val);
                          field.onBlur();
                        }}
                      />
                    )}
                  ></Controller>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex flex-col gap-4 pt-12">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-4 rounded-2xl hover:bg-blue-700 cursor-pointer font-medium text-sm text-center disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={
                !isDirty || !isValid || isSubmitting || !watchEventBanner
              }
            >
              {isSubmitting ? "CreatingEvent..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEvents;
