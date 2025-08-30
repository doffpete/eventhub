import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { FirebaseError } from "firebase/app";
import { Assets } from "../shared/assets";

interface ILoginFormData {
  emailAddress: string;
  password: string;
}

const defaultValues: DefaultValues<ILoginFormData> = {
  emailAddress: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser } = useAuth();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ILoginFormData>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const { register, handleSubmit, formState, reset } = form;
  const { isDirty, isValid, errors, isSubmitting } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const LoginBackground = Assets.IMAGES.LOGINBACKGROUND;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: ILoginFormData) => {
    try {
      setSubmitError(null);

      await signInUser(data.emailAddress, data.password);

      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setSubmitError("Incorrect email/password. Please try again.");
        } else {
          setSubmitError("Login failed. Please try again.");
        }
      } else {
        setSubmitError("Unexpected error occurred.");
      }
    } finally {
      reset();
    }
  };

  return (
    <>
      <div
        className="w-full flex md:p-4 items-center justify-center md:min-h-[100vh] bg-center bg-cover"
        style={{ backgroundImage: `url(${LoginBackground})` }}
      >
        <div className="w-full min-h-[100vh] md:w-4/5 flex flex-col md:flex-row md:min-h-[75vh] gap-3 px-5 md:px-16 md:rounded-2xl items-center md:bg-[linear-gradient(135deg,#4B5563,#111827)]">
          <div className="w-full md:w-1/2 md:min-h-[55vh] flex flex-col items-start px-3 py-4 md:justify-between">
            <div className="flex flex-col gap-3 pt-5">
              <Link to={{ pathname: "/" }}>
                <button className="cursor-pointer hover:bg-gray-300 h-7">
                  <img
                    src={Assets.LOGO.EVENT_LOGO}
                    alt="App Logo"
                    className="h-6 object-fit"
                  />
                </button>
              </Link>
              <h1 className="md:text-amber-50 text-gray-700 font-bold text-2xl">
                Welcome Back!
              </h1>
              <p className="md:text-amber-50 text-gray-700 font-medium md:font-light text-sm">
                Use the email address used when creating account.
              </p>
            </div>
            <div className="hidden md:flex flex-row gap-2">
              <p className="text-amber-50 font-medium text-sm">
                Don't have an account?
              </p>
              <button className="text-blue-500 font-medium text-sm cursor-pointer">
                <Link to={"/register"} state={{ from: from }}>
                  Click Here to Register
                </Link>
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 md:min-h-[55vh] flex flex-col gap-4 md:p-8 py-6 px-5 md:pl-12 md:items-start items-center bg-gray-200 rounded-2xl justify-center"
          >
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
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-500 pb-2"
              >
                Enter password*
              </label>
              <div className="w-full border border-gray-400 px-5 py-1.5 rounded-2xl flex items-center justify-between">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none py-2 text-gray-700 text-sm"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span
                  id="togglePassword"
                  className="text-black text-sm cursor-pointer font-normal"
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

            <div className="w-full flex flex-col gap-4 pt-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-2xl hover:bg-blue-700 cursor-pointer font-medium text-sm text-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!isDirty || !isValid || isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <div className="flex flex-col gap-2">
                <div className="border border-gray-50"></div>
                <button
                  type="button"
                  className="text-blue-500 cursor-pointer font-medium text-sm text-center"
                >
                  <Link to="/forgot_password">
                    <p>Forgot password?</p>
                  </Link>
                </button>
              </div>
            </div>
          </form>

          <div className="w-full md:hidden flex px-3 flex-row gap-2 items-center justify-between">
            <p className="text-gray-700 font-medium text-sm">
              Don't have an account?
            </p>
            <button className="text-blue-700 font-medium text-sm cursor-pointer">
              <Link to={"/register"} state={{ from: from }}>
                Click Here to Register
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
