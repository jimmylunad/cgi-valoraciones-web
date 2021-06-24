import { RoutePage } from "types/global";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

const routes: RoutePage[] = [
  { path: '/auth/login', component: Login },
  { path: '/auth/password', component: ResetPassword }
];

export default routes;