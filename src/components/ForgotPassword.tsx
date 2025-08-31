import { useForm, type DefaultValues } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import CheckEmail from "./CheckEmail";
import { useNavigate } from "react-router-dom";
import { Assets } from "../shared/assets";
import { FirebaseError } from "firebase/app";

interface IForgotPassword {
  emailAddress: string;
}

const defaultValues: DefaultValues<IForgotPassword> = {
  emailAddress: "",
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const MultiUseWallpaper = Assets.IMAGES.MULTIUSEBACKGROUND;
  const GenBackground = Assets.IMAGES.GEN_BACKGROUND;

  const form = useForm<IForgotPassword>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting, isValid } = formState;

  const navigate = useNavigate();

  const { passwordReset } = useAuth();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);

  const onSubmit = async (data: IForgotPassword) => {
    const redirectUrl =
      import.meta.env.VITE_RESET_PASSWORD_REDIRECT ||
      `${window.location.origin}/reset_password`;

    try {
      await passwordReset(data.emailAddress, redirectUrl);
      setEmail(data.emailAddress);
      setIsResetEmailSent(true);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          setSubmitError("No account found with that email address.");
        } else {
          setSubmitError("Failed to send reset email.");
        }
      } else {
        setSubmitError("An Error occured, retry later.");
      }
    } finally {
      reset();
    }
  };
  return (
    <>
      {!isResetEmailSent ? (
        <div
          className="md:w-full flex p-4 items-center justify-center min-h-[100vh] bg-center bg-cover"
          style={{ backgroundImage: `url(${GenBackground})` }}
        >
          <div
            className="w-full md:w-4/5 flex flex-row md:min-h-[75vh] gap-3 md:px-16 rounded-2xl items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
          >
            <div className="w-full md:w-1/2 min-h-[75vh] md:min-h-[55vh] p-4 flex flex-col gap-4 md:p-8 md:pl-12 items-start rounded-2xl bg-gray-200">
              <span
                onClick={() => navigate(-1)}
                className="flex flex-row gap-3 text-gray-700 items-center justify-center cursor-pointer"
              >
                <ArrowBackIcon />
                <p className="text-gray-700 text-lg">Back</p>
              </span>
              {submitError && (
                <div className="w-full bg-red-100 text-red-700 border border-red-400 p-3 rounded mb-4 flex justify-between items-center cursor-pointer">
                  <span>{submitError}</span>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="text-red-700 font-bold text-lg leading-none ml-4 hover:text-red-900 cursor-pointer"
                    aria-label="Dismiss error message"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex flex-col items-center gap-3 pt-12 md:pt-5">
                <h1 className="tems-center font-bold text-2xl">
                  Forgot Password
                </h1>
                <p className="text-sm text-gray-500 items-center">
                  No worries! Enter your email address below, and we will send
                  you a link to reset your password.
                </p>
              </div>

              <form
                className="w-full flex flex-col gap-3 pt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label
                  htmlFor="emailAddress"
                  className="font-medium text-sm text-gray-500"
                >
                  Email address*
                </label>
                <div className="w-full border border-gray-400 px-5 py-2 rounded-2xl">
                  <input
                    type="text"
                    placeholder="Enter email address"
                    className="w-full py-2 outline-none text-gray-700 text-sm"
                    {...register("emailAddress", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.emailAddress && (
                    <p className="text-red-500 text-xs">
                      {errors.emailAddress.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-gray-500 text-white px-4 py-3 rounded-2xl hover:bg-gray-700 cursor-pointer font-medium text-sm text-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
              </form>
            </div>
            <div className="hidden w-1/2 min-h-[55vh] md:flex flex-col items-start px-3 py-4 gap-5"></div>
          </div>
        </div>
      ) : (
        <CheckEmail email={email} />
      )}
    </>
  );
};

export default ForgotPassword;
