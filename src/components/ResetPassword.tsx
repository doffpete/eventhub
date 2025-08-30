import { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm, type DefaultValues } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/useAuth";
import { FirebaseError } from "firebase/app";
import { Assets } from "../shared/assets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IResetPassword {
  newPassword: string;
  confirmNewPassword: string;
}

const defaultValues: DefaultValues<IResetPassword> = {
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPassword = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { confirmResetPassword } = useAuth();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid password reset link.");
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setVerified(true))
      .catch(() => setError("The password reset link is invalid or expired."));
  }, [oobCode]);

  const MultiUseWallpaper = Assets.IMAGES.MULTIUSEBACKGROUND;
  const form = useForm<IResetPassword>({ defaultValues, mode: "onChange" });
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isSubmitting, isValid } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const checkPassword = watch("newPassword");

  const onSubmit = async (data: IResetPassword) => {
    try {
      //   if (!oobCode) return;
      if (mode !== "resetPassword" || !oobCode) {
        return <p>Invalid or expired action link.</p>;
      }

      const success = await confirmResetPassword(oobCode, data.newPassword);
      if (success) {
        navigate("/reset_success");
      } else {
        setSubmitError("Failed to reset password");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setSubmitError("Login failed. Please try again.");
      } else {
        setSubmitError("An error occured, try again");
      }
    } finally {
      reset();
    }
  };

  if (error) {
    return (
      <div className="container mx-auto max-w-md p-4 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="container mx-auto max-w-md p-4">
        <p className="text-sm text-center">Verifying reset link...</p>
      </div>
    );
  }
  return (
    <div className="w-full flex p-4 items-center justify-center min-h-[100vh] bg-center bg-cover">
      <div
        className="w-4/5 flex flex-row min-h-[75vh] gap-3 px-16 rounded-2xl items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
      >
        <div className="w-1/2 min-h-[55vh] flex flex-col items-start gap-4 p-8 pl-12 rounded-2xl bg-gray-200">
          <span
            onClick={() => navigate("/forgot_password")}
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
          <div className="flex flex-col items-center gap-3 pt-5">
            <h1 className="tems-center font-bold text-2xl">
              Create a New Password
            </h1>
            <p className="text-sm text-gray-500 items-center">
              Enter your new password below to complete the reset process.
              Ensure it's strong and secure.
            </p>
          </div>

          <form
            className="w-full flex flex-col gap-3 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-500"
              >
                New Password
              </label>
              <div className="w-full border border-gray-400 px-5 py-3 rounded-2xl flex items-center justify-between">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none py-2 text-gray-700 text-sm"
                  {...register("newPassword", {
                    required: "password field is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Must include at least one uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Must include at least one lowercase letter",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "Must include at least one number",
                      hasSpecialChar: (value) =>
                        /[^A-Za-z0-9]/.test(value) ||
                        "Must include at least one special character",
                    },
                  })}
                />
                <span
                  id="togglePassword"
                  className="text-black text-sm cursor-pointer font-normal pl-2"
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="font-medium text-sm text-gray-500 pb-2"
              >
                Repeat New Password
              </label>
              <div className="w-full border border-gray-400 px-5 py-3 rounded-2xl flex items-center justify-between">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none py-2 text-gray-700 text-sm"
                  {...register("confirmNewPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === checkPassword || "Password do not match",
                  })}
                />
                <span
                  id="togglePassword"
                  className="text-black text-sm cursor-pointer font-normal pl-2"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {!showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </span>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-3 rounded-2xl hover:bg-gray-700 cursor-pointer font-medium text-sm text-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {isSubmitting ? "Creating New password..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col gap-2"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
