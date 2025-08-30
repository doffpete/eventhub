import { Link, useLocation, useNavigate } from "react-router-dom";
import { Assets } from "../shared/assets";
import { useAuth } from "../auth/useAuth";
import ProfilePopOver from "../components/ProfilePopOver";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const EVENT_LOGO_MOBILE = Assets.LOGO.EVENT_LOGO_MOBILE;
  const EVENT_LOGO = Assets.LOGO.EVENT_LOGO;
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const [searchText, setSearchText] = useState(initialQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSearchText(initialQuery);
  }, [initialQuery]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search_results?query=${encodeURIComponent(searchText)}`);
    }
  };

  const logOutUser = () => {
    logOut();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full flex flex-col bg-gray-100 border-b border-b-gray-200 md:px-0 pb-1 md:pb-0">
      <div className="w-full gap-2 flex flex-row h-16 items-center px-1 md:px-2 py-0 md:justify-between md:border-b border-b-gray-200">
        <div className="w-full md:w-1/2 flex flex-row items-start md:items-center md:px-2 md:gap-6">
          <Link to={{ pathname: "/" }} className="hidden md:flex">
            <button className="cursor-pointer hover:bg-gray-300 h-7">
              <img
                src={EVENT_LOGO}
                alt="App Logo"
                className="h-6 object-contain"
              />
            </button>
          </Link>

          <Link to={{ pathname: "/" }} className="md:hidden">
            <button className="cursor-pointer hover:bg-gray-300 h-7 w-full">
              <img
                src={EVENT_LOGO_MOBILE}
                alt="App Logo"
                className="h-6 object-contain"
              />
            </button>
          </Link>

          <div className="hidden w-full md:flex items-center bg-gray-100 rounded-2xl overflow-hidden border border-gray-300 cursor-pointer">
            <input
              type="text"
              placeholder="Search events..."
              className="px-2 md:px-4 py-2 outline-none text-gray-700 text-sm w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-900 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-row md:ml-0 items-center text-center gap-2 md:gap-4 cursor-pointer md:justify-center justify-between">
          {(!isMobile || (isMobile && !user)) && (
            <Link
              to="/search_events"
              className="md:rounded-3xl md:px-4 pl-5 py-2.5 text-sm hover:bg-gray-200 hover:text-gray-600 text-center"
            >
              Search Events
            </Link>
          )}

          {(!isMobile || (isMobile && !user)) && (
            <div className="flex md:flex-wrap md:flex-col items-center text-center md:pt-0">
              <Typography
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Link
                  to="/create_events"
                  className="md:rounded-3xl md:px-4 py-2.5 text-sm hover:bg-gray-200 hover:text-gray-600 text-center"
                >
                  Create Events
                </Link>
                <Popover
                  id="mouse-over-popover"
                  sx={{ pointerEvents: "none" }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1, bgcolor: "#101828", color: "white" }}>
                    Ready to create events?,
                    <br />
                    SignIn!!
                  </Typography>
                </Popover>
              </Typography>
            </div>
          )}

          <Link
            to="/help_center"
            className="hidden md:flex rounded-3xl px-4 py-2.5 text-sm hover:bg-gray-200 hover:text-gray-600 text-center"
          >
            HelpDesk
          </Link>

          <Link
            to="/find_my_tickets"
            className="hidden md:flex rounded-3xl px-4 py-2.5 text-sm hover:bg-gray-200 hover:text-gray-600 text-center"
          >
            My tickets
          </Link>

          <div className="hidden md:ml-auto md:flex items-center">
            {!user || loading ? (
              <>
                <span className="rounded-3xl border px-4 py-2.5 text-sm border-none hover:bg-gray-200 hover:text-gray-600">
                  <Link to="/login">Login</Link>
                </span>
                <span className="rounded-3xl border px-4 py-2 text-sm border-none hover:bg-gray-200 hover:text-gray-600">
                  <Link to="/register">Register</Link>
                </span>
              </>
            ) : (
              <>
                <ProfilePopOver />
              </>
            )}
          </div>

          {/* Unregistered user Mobile view */}
          <div className="md:hidden flex items-center gap-3">
            {!user || loading ? (
              <>
                <Link
                  to="/login"
                  className="text-sm rounded-3xl px-1 py-2 border-gray-300 hover:bg-gray-200 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm rounded-3xl px-1 py-2 border-gray-300 hover:bg-gray-200 hover:text-gray-700"
                >
                  Register
                </Link>
              </>
            ) : null}
          </div>

          {/* MOBILE ICON TOGGLE */}
          <div className="ml-auto md:hidden flex items-center justify-center text-center rounded-full bg-gray-200 p-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : user && isMobile ? (
                <AccountCircleIcon />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex px-5">
        <div className="md:hidden w-full flex flex-row h-10 overflow-hidden py-0 rounded-3xl cursor-pointer items-center bg-gray-200">
          <input
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 outline-none text-gray-700 text-sm w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-900 cursor-pointer"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-2/4 bg-gray-100 rounded-bl-lg shadow-lg z-50 border-t border-gray-300">
          <div className="flex flex-col max-h-[40vh] items-start text-start px-0 py-4 gap-3 text-sm text-gray-800 overflow-y-scroll">
            {user ? (
              <>
                <Link
                  to="/search_events"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search Events
                </Link>
                <Link
                  to="/create_events"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Events
                </Link>
                <div className="w-full border-b border-gray-300"></div>
                <Link
                  to="/help_center"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HelpDesk
                </Link>
                <Link
                  to="/find_my_tickets"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Tickets
                </Link>
                <div className="w-full border-b border-gray-300"></div>
                <p className="px-4 py-2">{user.email}</p>
                <Link
                  to="/find_my_tickets"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account Settings
                </Link>
                <button
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={logOutUser}
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/help_center"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HelpDesk
                </Link>
                <div className="w-full border-b border-gray-300"></div>
                <Link
                  to="/find_my_tickets"
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Tickets
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {/* {mobileMenuOpen && (
        <div className="md:hidden absolute top-26 right-0 w-2/4 bg-gray-100 rounded-bl-lg shadow-lg">
          <div className="flex flex-col items-end text-end px-0 py-4 gap-3 text-sm text-gray-800">
            <Link
              to="/search_events"
              className="px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Search Events
            </Link>
            <p className="">User Email</p>
            <Link
              to="/create_events"
              className="px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Create Events
            </Link>
            <Link
              to="/help_center"
              className="px-4 py-2 rounded-md hover:bg-gray-100"
            >
              HelpDesk
            </Link>

            <div className="w-full border-b border-gray-300"></div>
            <Link
              to="/find_my_tickets"
              className="px-4 py-2 rounded-md hover:bg-gray-100"
            >
              My Tickets
            </Link>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default NavBar;
