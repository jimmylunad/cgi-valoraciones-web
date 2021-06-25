/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

const Logout = (): JSX.Element => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); 
  
  useEffect(() => {
    removeCookie("token", {path: '/'});
    history.push("/auth/login");
  },[history, removeCookie]);

  return <></>
};

export default Logout;
