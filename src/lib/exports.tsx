import { RiUser3Fill } from "react-icons/ri";
import { PiShieldWarningFill } from "react-icons/pi";
import { BsWindowStack } from "react-icons/bs";
import { Sections } from "./schemas";

export const sections: Sections[] = [
    {
      title: "Personal info",
      description: "Manage your basic information",
      icon: <RiUser3Fill color="black" fontSize={20} />,
      subSections: [
        {
          title: "Personal info",
          url: "/realms/reunion/account/personal-info",
        },
      ],
    },
    {
      title: "Account security",
      description: "Control your password and account access",
      icon: <PiShieldWarningFill color="black" fontSize={20} />,
      subSections: [
        {
          title: "Signing in",
          url: null,
        },
        {
          title: "Device activity",
          url: null,
        },
        {
          title: "Linked accounts",
          url: null,
        },
      ],
    },
    {
      title: "Applications",
      description:
        "Track and manage your app permission to access your account",
      icon: <BsWindowStack color="black" fontSize={20} />,
      subSections: [
        {
          title: "Applications",
          url: "/realms/reunion/account/applications",
        },
      ],
    },
  ];