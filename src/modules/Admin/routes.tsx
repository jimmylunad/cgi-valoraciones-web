import { RoutePage } from "types/global";
import Historial from "./Historial";
import Home from "./Home";
import Logout from "./Logout";
import Notificaciones from "./Notificaciones";
import Assignments from "./Assignments";
import Information from "./Information";

const routes: RoutePage[] = [
  { path: '/valoraciones', component: Assignments },
  { path: '/historial', component: Historial },
  { path: '/informacion/:id', component: Information },
  { path: '/notificaciones', component: Notificaciones },
  { path: '/logout', component: Logout },
  { path: '/', component: Home },
];

export default routes;