import EventGroups from "../components/EventGroups";
import EventList from "../components/EventList";
import { Assets } from "../shared/assets";

const Home = () => {
  return (
    <div className="w-full min-h-[100vh] pb-5 gap-2 flex flex-col items-center pt-22 md:pt-12 md:pb-12">
      <div className="w-full md:px-20 flex flex-col items-center gap-3 md:gap-8 md:pb-24">
        <div className="w-full h-96 md:rounded-t-3xl md:rounded-b-md overflow-hidden relative">
          <img
            src={Assets.IMAGES.HOME_PHOTO}
            alt="Home Image"
            className="w-full h-full object-fit"
          />
        </div>
        <EventGroups />
      </div>
      <div className="w-full border text-gray-200"></div>
      <div className="w-full">
        <EventList />
      </div>
    </div>
  );
};

export default Home;

//

//  <nav className="w-full flex flex-col bg-gray-200 border-b border-b-gray-200">
//   {/* Top Bar */}
//   <div className="w-full flex items-center h-16 px-4 justify-between">
//     {/* Left: Logo */}
//     <Link to="/" className="flex items-center gap-2">
//       <img
//         src={Assets.LOGO.EVENT_LOGO}
//         alt="App Logo"
//         className="h-6 object-contain"
//       />
//     </Link>
//     {/* Center: Mobile only - Create Events, Login/Register */}
//     <div className="flex md:hidden items-center gap-3 text-sm">
//       <Link to="/create_events" className="hover:text-gray-600">
//         Create Events
//       </Link>
//       {!user || loading ? (
//         <>
//           <Link to="/login" className="hover:text-gray-600">
//             Login
//           </Link>
//           <Link to="/register" className="hover:text-gray-600">
//             Register
//           </Link>
//         </>
//       ) : (
//         <ProfilePopOver />
//       )}
//     </div>
//     {/* Right: Desktop nav OR Mobile hamburger */}
//     <div className="hidden md:flex items-center gap-4 text-sm">
//       <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden border border-gray-300">
//         <input
//           type="text"
//           placeholder="Search events..."
//           className="px-4 py-2 text-gray-700 text-sm outline-none w-full"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-900"
//         >
//           Search
//         </button>
//       </div>

//       <Link to="/search_events" className="nav-link">
//         Search Events
//       </Link>
//       <div className="flex pt-1.5 md:pt-0 items-center justify-center">
//         <Typography
//           aria-owns={open ? "mouse-over-popover" : undefined}
//           aria-haspopup="true"
//           onMouseEnter={handlePopoverOpen}
//           onMouseLeave={handlePopoverClose}
//         >
//           <Link
//             to="/create_events"
//             className="rounded-3xl px-4 py-2.5 text-sm hover:bg-gray-200 hover:text-gray-600 text-center"
//           >
//             Create Events
//           </Link>
//           <Popover
//             id="mouse-over-popover"
//             sx={{ pointerEvents: "none" }}
//             open={open}
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "left",
//             }}
//             onClose={handlePopoverClose}
//             disableRestoreFocus
//           >
//             <Typography sx={{ p: 1, bgcolor: "#101828", color: "white" }}>
//               Ready to create events?,<br></br> SignIn!!
//             </Typography>
//           </Popover>
//         </Typography>
//       </div>
//       <Link to="/help_center" className="nav-link">
//         HelpDesk
//       </Link>
//       <Link to="/find_my_tickets" className="nav-link">
//         My Tickets
//       </Link>

//       {!user || loading ? (
//         <>
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//           <Link to="/register" className="nav-link">
//             Register
//           </Link>
//         </>
//       ) : (
//         <ProfilePopOver />
//       )}
//     </div>
//     {/* Hamburger - Mobile only */}
//     <div className="md:hidden">
//       <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
//         {mobileMenuOpen ? (
//           <p className="w-6 h-6">X</p>
//         ) : (
//           <Menu className="w-6 h-6" open />
//         )}
//       </button>
//     </div>
//   </div>

//   {/* Mobile Search */}
//   <div className="md:hidden w-full px-4 pt-2">
//     <div className="flex h-10 bg-white w-full rounded-3xl overflow-hidden items-center">
//       <input
//         type="text"
//         placeholder="Search events..."
//         className="px-4 py-2 text-gray-700 text-sm w-full outline-none"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//       />
//       <button
//         onClick={handleSearch}
//         className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-900"
//       >
//         Search
//       </button>
//     </div>
//   </div>

//   {/* Mobile Menu Dropdown */}
//   {mobileMenuOpen && (
//     <div className="md:hidden flex flex-col px-4 py-2 gap-2 text-sm text-gray-700">
//       <Link to="/search_events" className="mobile-nav-link">
//         Search Events
//       </Link>
//       <Link to="/help_center" className="mobile-nav-link">
//         HelpDesk
//       </Link>
//       <Link to="/find_my_tickets" className="mobile-nav-link">
//         My Tickets
//       </Link>
//     </div>
//   )}
// </nav>
