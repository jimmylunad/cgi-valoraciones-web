/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import useAuthActions from "providers/Auth/actions";

const Logout = (): JSX.Element => {
  const history = useHistory();
  const { setAuthLogout } = useAuthActions();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); 
  
  useEffect(() => {
    removeCookie("token", {path: '/'});
    setAuthLogout();
    setTimeout(() => {
      history.push("/auth/login");
    }, 100);
  },[history, removeCookie, setAuthLogout]);

  return <></>
};

export default Logout;
