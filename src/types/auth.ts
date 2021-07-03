import { ROLE } from "./global";

export interface IAuth {
  token: string;
  plate: string | null;
  name: string;
  role: ROLE,
  scheduledAssignment: string | null;
  pendingAssignment: string | null; 
}