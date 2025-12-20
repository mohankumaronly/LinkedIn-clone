import {
  House,
  Users,
  BriefcaseBusiness,
  Bell,
  MessageSquareMore,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", icon: House, path: "/home" },
  { label: "My Network", icon: Users, path: "/network" },
  { label: "Jobs", icon: BriefcaseBusiness, path: "/jobs" },
  { label: "Messages", icon: MessageSquareMore, path: "/messages" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
];
