import * as React from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../auth/useAuth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePopOver = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const userEmail = user?.email || "No email";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DailogLists = [
    {
      label: "Account Setting",
      onClick: () => {
        handleClose();
      },
    },
    ...(user && isMobile
      ? [
          {
            label: userEmail,
            onClick: () => {},
          },
          {
            label: "SearchEvent",
            onClick: () => {
              handleSearchEvent();
            },
          },
          {
            label: "CreateEvents",
            onClick: () => {
              handleCreateEvent();
            },
          },
        ]
      : []),
    {
      label: "LogOut",
      onClick: () => {
        logOut();
        handleClose();
      },
    },
  ];
  const shortenEmail = (email: string | undefined | null) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const shortenedName = name.length > 5 ? name.slice(0, 5) + "..." : name;
    return `${shortenedName}@${domain}`;
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateEvent = () => {
    navigate("/create_events");
    handleClose();
  };

  const handleSearchEvent = () => {
    navigate("/search_events");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="rounded-full items-center">
      <Button
        aria-describedby={id}
        variant="text"
        className=" px-1 !normal-case !text-sm !text-black hover:!bg-gray-200 hover:!text-gray-600 flex flex-row gap-1 items-center cursor-pointer"
        onClick={handleClick}
      >
        <AccountCircleIcon />
        <p className="hidden md:flex">{shortenEmail(user?.email)}</p>
        <ArrowDropDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <List sx={{ pt: 0, width: "100%", minWidth: 200 }}>
          {DailogLists.map((DailogList) => (
            <ListItem divider disablePadding key={DailogList.label}>
              <ListItemButton onClick={() => DailogList.onClick()}>
                <ListItemText primary={DailogList.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ProfilePopOver;
