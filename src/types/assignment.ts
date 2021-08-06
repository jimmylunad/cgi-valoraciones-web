export type Assignment = {
  id: string;
  code: string;
  addresName: string;
  contractor: string;
  management: string;
  routeName: string;
  scheduledDate: string;
  dateAttended: string;
  status: string;
  availableOptions?:boolean;
  superIntendence?: string;
};


export type Option = {
  value: number;
  option: string;
};

export interface OptionsAssignment {
  date: Option[];
  flote: Option[]; 
  route: Option[];
  contractor: Option[];
  management: Option[];
  plate?:Option[];
  address?:Option[];
}