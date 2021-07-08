/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';
import { useContext, useEffect } from "react";
import useAuthActions from "providers/Auth/actions";
import { IDBState } from "providers/DB/reducer";
import { DBDataContext } from "providers/DB/provider";

const Logout = (): JSX.Element => {
  const history = useHistory();
  const { db } = useContext<IDBState>(DBDataContext);
  const { setAuthLogout } = useAuthActions();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); 
  
  useEffect(() => {
    db.table('assignments').clear();
    db.table('rating').clear();
    removeCookie("token", {path: '/'});
    setAuthLogout();
    setTimeout(() => {
      history.push("/auth/login");
    }, 100);
  },[history, removeCookie, setAuthLogout, db]);

  return <></>
};

export default Logout;
