import { RoutePage } from "types/global";
import Historial from "./Historial";
import Home from "./Home";
import Logout from "./Logout";
import Notificaciones from "./Notificaciones";
import Valoraciones from "./Valoraciones";

const routes: RoutePage[] = [
  { path: '/valoraciones', component: Valoraciones },
  { path: '/historial', component: Historial },
  { path: '/notificaciones', component: Notificaciones },
  { path: '/logout', component: Logout },
  { path: '/', component: Home },
];

export default routes;