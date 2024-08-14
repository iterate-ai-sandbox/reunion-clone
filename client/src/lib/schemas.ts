import { ReactElement } from "react";
import { IconType } from "react-icons";

export interface Sections {
  title: string;
  description: string;
  icon: ReactElement<IconType>;
  subSections: SubSection[];
}

export interface SubSection {
  title: string;
  url: string | null;
}
