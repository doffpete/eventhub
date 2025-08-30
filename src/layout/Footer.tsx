import { Assets } from "../shared/assets";

const Footer = () => {
  const footerLists = [
    { id: 1, label: "About", href: "/about" },
    { id: 2, label: "Blog", href: "/blog" },
    { id: 3, label: "Help", href: "/help" },
    { id: 4, label: "Careers", href: "/careers" },
    { id: 5, label: "Impact", href: "/impact" },
    { id: 6, label: "Investors", href: "/investors" },
    { id: 7, label: "Security", href: "/security" },
    { id: 8, label: "Developers", href: "/developers" },
    { id: 9, label: "Terms", href: "/terms" },
    { id: 10, label: "Privacy", href: "/privacy" },
    { id: 11, label: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="w-full flex flex-col md:flex-row md:items-center md:justify-between bg-gray-900 text-gray-300 px-4 py-4 gap-4">
      <div className="flex items-center text-xs text-gray-500 gap-2 justify-center md:justify-start">
        © {new Date().getFullYear()}
        <img
          src={Assets.LOGO.EVENT_LOGO}
          alt="App Logo"
          className="h-3 object-contain"
        />
        All rights reserved.
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-center">
        {footerLists.map((footerList) => (
          <a
            key={footerList.id}
            href={footerList.href}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            {footerList.label}
          </a>
        ))}
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          src={Assets.LOGO.EVENT_LOGO}
          alt="App Logo"
          className="h-3 object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
