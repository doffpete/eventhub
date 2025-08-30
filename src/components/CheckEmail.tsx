import EmailIcon from "@mui/icons-material/Email";
import { Assets } from "../shared/assets";

const CheckEmail = () => {
  const MultiUseWallpaper = Assets.IMAGES.MULTIUSEBACKGROUND;

  return (
    <>
      <div className="w-full flex p-4 items-center justify-center min-h-[100vh] bg-center bg-cover">
        <div
          className="w-4/5 flex flex-row min-h-[75vh] gap-3 px-16 rounded-2xl items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
        >
          <div className="w-1/2 min-h-[55vh] flex flex-col gap-4 p-8 pl-12 items-start rounded-2xl bg-gray-200">
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
                Didn't receive the email?
                <p className="text-sm text-gray-800">Resend</p>
              </span>
            </div>
          </div>
          <div
            className="w-1/2 min-h-[55vh] flex flex-col items-start px-3 py-4 gap-5 bg-center bg-cover"
            style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CheckEmail;
