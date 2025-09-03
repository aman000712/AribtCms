import { RiHomeHeartLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar, MdOutlineSchool } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

export const navItems = [
  {
    title: "Dashboard",
    icon: RiHomeHeartLine,
    to: "/dashboard"
  },
  {
    title: "Home",
    icon: RiHomeHeartLine,
    to: "/"
  },
  {
    title: "Services",
    icon: IoMdPerson,
    to: "/services"
  },
  {
    title: "Portfolio",
    icon: MdOutlineSchool,
    to: "/portfolio"
  },
  {
    title: "Blog",
    icon: MdOutlineSchool,
    to: "/blog"
  },
  {
    title: "Team",
    icon: MdOutlinePermContactCalendar,
    to: "/team"
  },
 
  {
    title: "Media Gallery",
    icon: IoMdPerson,
    to: "/gallery"
  },
   {
    title: "Testimonials",
    icon: MdOutlinePermContactCalendar,
    to: "/testimonials"
  },
  {
    title: "Contact Inquries",
    icon: IoMdPerson,
    to: "/contact"
  },
  {
    title: " Management",
    icon: IoMdPerson,
    to: "/footer"
  },

];

export const logoutItem = {
  title: "Logout",
  icon: BiLogOut,
  to: "/logout"
};
