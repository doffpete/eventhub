// import React from 'react'

import { Link } from "react-router-dom";
import { Assets } from "../shared/assets";
import VerifiedIcon from "@mui/icons-material/Verified";

const ResetSuccess = () => {
  const GenBackground = Assets.IMAGES.GEN_BACKGROUND;

  const MultiUseWallpaper = Assets.IMAGES.MULTIUSEBACKGROUND;
  return (
    <>
      <div
        className="w-full flex p-4 items-center justify-center min-h-[100vh] bg-center bg-cover"
        style={{ backgroundImage: `url(${MultiUseWallpaper})` }}
      >
        <div
          className="w-4/5 flex flex-row min-h-[75vh] gap-3 md:px-16 rounded-2xl items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${GenBackground})` }}
        >
          <div className="w-full md:w-1/2 min-h-[75vh] md:min-h-[55vh] flex flex-col gap-4 p-4 pt-12 md:pt-0 md:p-8 md:pl-12 items-start rounded-2xl bg-gray-200">
            <span className="w-full flex text-gray-700 items-center justify-center">
              <VerifiedIcon style={{ height: "45px", width: "45px" }} />
            </span>

            <div className="flex flex-col items-center gap-3 pt-5">
              <h1 className="text-2xl items-center">
                Your password has been successfully reset!
              </h1>
              <p className="text-sm text-gray-500 items-center">
                You can now log in with your new password. If you encounter any
                issues please contact support.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 pt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-3 rounded-2xl hover:bg-gray-700 cursor-pointer font-medium text-sm text-center"
              >
                <Link to="/login">
                  <p>Back to Login</p>
                </Link>
              </button>
            </div>
          </div>
          <div
            className="hidden w-1/2 min-h-[55vh] md:flex flex-col items-start px-3 py-4 gap-5 bg-center bg-cover"
            style={{ backgroundImage: `url(${GenBackground})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ResetSuccess;
