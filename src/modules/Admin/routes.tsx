import { ROLE, RoutePage, RoutePageRole } from "types/global";
import Historial from "./Historial";
import Home from "./Home";
import Logout from "./Logout";
import Notificaciones from "./Notificaciones";
import Assignments from "./Assignments";
import Information from "./Information";
import Rating from "./Rating";
import AssignmentNew from "./AssignmentNew";
import AssignmentRepro from "./AssignmentRepro";

const ROUTES_OPERATOR: RoutePage[] = [
  { path: '/programaciones/informacion/:index', component: Information },
  { path: '/programaciones/programacion/:index', component: Rating },
  { path: '/programaciones/motivo/:index', component: Rating },
  { path: '/programaciones', component: Assignments },
  { path: '/historial/informacion/:id', component: Information },
  { path: '/historial/programacion/:id', component: Rating },
  { path: '/historial', component: Historial },
  { path: '/notificaciones', component: Notificaciones },
  { path: '/logout', component: Logout },
  { path: '/', component: Home },
];

const ROUTES_SUPERVISOR: RoutePage[] = [
  { path: '/programaciones/informacion/:index', component: Information },
  { path: '/programaciones/motivo/:index', component: Rating },
  { path: '/programaciones/reprogramacion/:index', component: AssignmentRepro },
  { path: '/programaciones/nueva', component: AssignmentNew },
  { path: '/programaciones/:id', component: Assignments },
  { path: '/logout', component: Logout },
  { path: '/', component: Home },
];

const routes: RoutePageRole = {
  [`${ROLE.operator}`]: ROUTES_OPERATOR,
  [`${ROLE.supervisor}`]: ROUTES_SUPERVISOR,
} 

export default routes;