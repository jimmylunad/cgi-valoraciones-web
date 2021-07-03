import { AuthDataContext } from "providers/Auth/provider";
import { IAuthState } from "providers/Auth/reducer";
import { useContext } from "react";
import { ROLE } from "types/global";
import OperatorAssignments from "./operator";
import SupervisorAssignments from "./supervisor";

const Assignments = (): JSX.Element => {
  const { role } = useContext<IAuthState>(AuthDataContext);

  return role === ROLE.operator ? <OperatorAssignments /> : <SupervisorAssignments />;
};

export default Assignments;