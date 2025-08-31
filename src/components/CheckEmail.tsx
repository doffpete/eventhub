import EmailIcon from "@mui/icons-material/Email";
import { Assets } from "../shared/assets";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const CheckEmail = ({ email }: { email: string }) => {
  const MultiUseWallpaper = Assets.IMAGES.MULTIUSEBACKGROUND;
  const GenBackground = Assets.IMAGES.GEN_BACKGROUND;

  const { passwordReset } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    try {
      const redirectUrl =
        import.meta.env.VITE_RESET_PASSWORD_REDIRECT ||
        `${window.location.origin}/reset_password`;

      await passwordReset(email, redirectUrl);
      setMessage("Password reset email has been resent!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to resend. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full flex p-4 items-center justify-center min-h-[100vh] bg-center bg-cover"
        style={{ backgroundImage: `url(${GenBackground})` }}
      >
        <div
          className="w-4/5 flex flex-row min-h-[75vh] gap-3 md:px-16 rounded-2xl items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
        >
          <div className="w-full md:w-1/2 min-h-[75vh] md:min-h-[55vh] flex flex-col gap-4 p-4 md:p-8 md:pl-12 items-center md:items-start rounded-2xl bg-gray-200">
            <span className="w-full flex text-gray-700 items-center justify-center">
              <EmailIcon style={{ height: "45px", width: "45px" }} />
            </span>

            <div className="flex flex-col items-center gap-3 pt-5">
              <h1 className="text-2xl items-center">Check your email</h1>
              <p className="text-sm text-gray-500 items-center">
                We sent a password reset link to your email. Please check your
                inbox. If not found, check your spam.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 pt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-3 rounded-2xl hover:bg-gray-700 cursor-pointer font-medium text-sm text-center"
                onClick={() => window.open("https://mail.google.com", "_blank")}
              >
                Open Gmail
              </button>

              <span className="flex flex-row gap-2 text-sm text-gray-500 items-center justify-center">
                <p>Didn't receive the email?</p>
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {loading ? "Resending..." : "Resend"}
                </button>
              </span>
              {message && (
                <div className="relative w-full md:w-2/3 bg-green-100 text-green-700 border border-green-400 p-3 rounded mt-4 flex justify-between items-center">
                  <span>{message}</span>
                  <button
                    type="button"
                    onClick={() => setMessage(null)}
                    className="text-green-700 font-bold text-lg leading-none ml-4 hover:text-green-900 cursor-pointer"
                    aria-label="Dismiss resent message"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className="hidden md:w-1/2 min-h-[55vh] md:flex flex-col items-start px-3 py-4 gap-5 bg-center bg-cover"
            style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CheckEmail;
