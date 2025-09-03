import { RiCustomerServiceFill, RiHomeHeartLine } from "react-icons/ri";
import { MdDashboard, MdOutlinePermContactCalendar, MdOutlineSchool } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { GiTeamDowngrade } from "react-icons/gi";
import { GrContact, GrGallery } from "react-icons/gr";
import { BsChatSquareQuote } from "react-icons/bs";
import { FaLink } from "react-icons/fa";

export const navItems = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    to: "/dashboard"
  },
  {
    title: "Home",
    icon: RiHomeHeartLine,
    to: "/"
  },
  {
    title: "Services",
    icon: RiCustomerServiceFill,
    to: "/services"
  },
  {
    title: "Portfolio",
    icon: MdOutlineSchool,
    to: "/portfolio"
  },
  {
    title: "Blog",
    icon: ImBlog,
    to: "/blog"
  },
  {
    title: "Team",
    icon:GiTeamDowngrade,
    to: "/team"
  },
 
  {
    title: "Media Gallery",
    icon: GrGallery,
    to: "/gallery"
  },
   {
    title: "Testimonials",
    icon: BsChatSquareQuote,
    to: "/testimonials"
  },
  {
    title: "Contact Inquries",
    icon: GrContact,
    to: "/contact"
  },
  {
    title: " Management",
    icon: FaLink,
    to: "/footer"
  },

];

export const logoutItem = {
  title: "Logout",
  icon: BiLogOut,
  to: "/logout"
};
