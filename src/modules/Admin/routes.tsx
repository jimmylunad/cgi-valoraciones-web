import { RoutePage } from "types/global";
import Historial from "./Historial";
import Home from "./Home";
import Logout from "./Logout";
import Notificaciones from "./Notificaciones";
import Assignments from "./Assignments";
import Information from "./Information";
import Rating from "./Rating";

const routes: RoutePage[] = [
  { path: '/programaciones/informacion/:index', component: Information },
  { path: '/programaciones/valoracion/:index', component: Rating },
  { path: '/programaciones', component: Assignments },
  { path: '/historial/informacion/:id', component: Information },
  { path: '/historial/valoracion/:id', component: Rating },
  { path: '/historial', component: Historial },
  { path: '/notificaciones', component: Notificaciones },
  { path: '/logout', component: Logout },
  { path: '/', component: Home },
];

export default routes;