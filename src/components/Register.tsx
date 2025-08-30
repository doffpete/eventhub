import Switch from "@mui/material/Switch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../auth/useAuth";
import { doc, setDoc } from "firebase/firestore";
import type { SubmitHandler, DefaultValues } from "react-hook-form";
import { useState } from "react";
import { db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useErrorBoundary } from "react-error-boundary";
import { FirebaseError } from "firebase/app";
import { Assets } from "../shared/assets";

interface ISignupFormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const defaultValues: DefaultValues<ISignupFormData> = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: true,
};

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const { signInWithGoogle, signUpNewUser } = useAuth();
  const { showBoundary } = useErrorBoundary();

  const SignInBackground = Assets.IMAGES.SIGNINBACKGROUND;

  const [loading, setLoading] = useState(false);
  const form = useForm<ISignupFormData>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const { register, control, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const watchRadio = watch("agreeToTerms");
  const checkPassword = watch("password");

  const onSubmit: SubmitHandler<ISignupFormData> = async (
    data: ISignupFormData
  ) => {
    try {
      const userData = await signUpNewUser(data.emailAddress, data.password);
      const userProfile = userData.user;

      // updating firebase auth profile with displayname
      await updateProfile(userProfile, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // saving extra registration fields to firestore
      await setDoc(doc(db, "users", userProfile.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.emailAddress,
        agreeToTerms: data.agreeToTerms,
        date: new Date(),
      });

      navigate(from, { replace: true });
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

  // signIn with google logic
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      showBoundary(error);
      console.error("my error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="w-full flex md:px-4 md:py-12 items-center justify-center min-h-[100vh] bg-center bg-cover"
        style={{ backgroundImage: `url(${SignInBackground})` }}
      >
        <div className="w-full md:w-4/5 flex flex-col md:flex-row gap-6 md:gap-3 py-6 px-4 md:px-16 md:rounded-2xl items-center bg-[linear-gradient(135deg,#4B5563,#111827)]">
          <div className="w-full md:w-1/2 flex flex-col md:min-h-[50vh] items-start px-3 py-4 justify-between">
            <div className="flex flex-col gap-1">
              <Link to={{ pathname: "/" }}>
                <button className="cursor-pointer hover:bg-gray-300 h-7">
                  <img
                    src={Assets.LOGO.EVENT_LOGO}
                    alt="App Logo"
                    className="h-6 object-fit"
                  />
                </button>
              </Link>
              <h1 className="text-amber-50 font-bold text-2xl">
                Create Account!
              </h1>
              <p className="text-amber-50 font-light text-sm">
                Creation is free, register! let's grow together.
              </p>
            </div>
            <div className="hidden md:flex flex-row gap-2">
              <p className="text-amber-50 font-medium text-sm">
                Already have an account?
              </p>
              <button className="text-blue-500 font-medium text-sm cursor-pointer">
                <Link to={"/login"}>Click Here to Login</Link>
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 flex flex-col gap-3 p-5 md:p-8 md:pl-12 items-center rounded-2xl bg-gray-200"
          >
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="font-medium text-sm text-gray-500"
              >
                First Name*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl">
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter name here"
                  className="w-full py-2 outline-none text-gray-700 text-sm"
                  {...register("firstName", {
                    required: "First name is required",
                    validate: (value) =>
                      /^[A-Za-z]+$/.test(value) || "Only letters are allowed",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="font-medium text-sm text-gray-500"
              >
                Last Name*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className="w-full py-2 outline-none text-gray-700 text-sm"
                  {...register("lastName", {
                    required: "last name is required",
                    validate: (value) =>
                      /^[A-Za-z]+$/.test(value) || "Only letters are allowed",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="emailAddress"
                className="font-medium text-sm text-gray-500"
              >
                Email address*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl">
                <input
                  type="text"
                  id="emailAddress"
                  placeholder="Enter email address"
                  className="w-full py-2 outline-none text-gray-700 text-sm"
                  {...register("emailAddress", {
                    required: "Email is required",
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
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-500"
              >
                Password*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl flex items-center justify-between">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none py-2 text-gray-700 text-sm"
                  {...register("password", {
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
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="font-medium text-sm text-gray-500 pb-2"
              >
                Confirm Password*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl flex items-center justify-between">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none py-2 text-gray-700 text-sm"
                  {...register("confirmPassword", {
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <span className="w-full flex flex-row gap-3 items-center text-center">
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Switch
                    onChange={onChange}
                    onBlur={onBlur}
                    checked={value}
                    required
                  />
                )}
              />
              <p className="text-gray-700 text-sm font-medium">
                I agree to terms & conditions
              </p>
            </span>

            <div className="w-full flex flex-col gap-4 pt-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-2xl hover:bg-blue-700 cursor-pointer font-medium text-sm text-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!isDirty || !isValid || !watchRadio || isSubmitting}
              >
                {isSubmitting ? "isSubmitting..." : "Sign Up"}
              </button>

              <div className="flex flex-col gap-2">
                <div className="border border-gray-100"></div>
                <button
                  type="button"
                  className="bg-gray-100 text-black px-4 py-3 rounded-2xl hover:bg-blue-700 hover:text-white cursor-pointer font-medium text-sm text-center disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Signup with Google"}
                </button>
              </div>
            </div>
          </form>

          <div className="flex md:hidden flex-row gap-2">
            <p className="text-amber-50 font-medium text-sm">
              Already have an account?
            </p>
            <button className="text-blue-500 font-medium text-sm cursor-pointer">
              <Link to={"/login"}>Click Here to Login</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
