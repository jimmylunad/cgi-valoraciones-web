import { RoutePage } from "types/global";
import AdminModule from "./Admin";
import AuthModule from "./Auth";

const routes: RoutePage[] = [
  { path: '/auth', component: AuthModule },
  { path: '/', component: AdminModule, protected: true },
];

export default routes;
