/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput, FormCheckbox } from "components/Form";
import { Link, useHistory } from "react-router-dom";
import useFetch from "services/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from 'react-cookie';
import "./styles.scss";
import logo from "./../../../images/logo.png";
import useAuthActions from 'providers/Auth/actions';
import handleNotify from 'utils/handle-notify';

const Login = ():JSX.Element => {
  const [cookies, setCookie] = useCookies(["token", "pendingAssignment"]);
  const history = useHistory();
  const [errorServer, setErrorServer] = useState<string | null>(null);
  const { setAuthLogin } = useAuthActions();

  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors 
    } 
  } = useForm();

  const { fetch, loading } = useFetch({
    config: {
      url: '/v1/app/signin',
      method: 'POST',
    },
    loading: false,
  });

  useEffect(() => {
    handleNotify();
  },[]);

  const onSubmit = useCallback(async (data: any) => {
    setErrorServer(null);
    const response = await fetch({ data });

    if (!response.success) {
      setErrorServer(response.message);
    } else {

      setAuthLogin(response.data);
      let expires: Date = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      // expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
      // console.log("expires", expires);
      setCookie("token", response.data.token, { path: '/', expires });
      setCookie("pendingAssignment", response.data.pendingAssignment, { path: '/', expires });
      localStorage.setItem("plate",response.data.plate);
      history.push('/');
    }
    return "";
  }, [fetch, history, setCookie, setAuthLogin]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Container maxWidth="md" className="container">
        <Grid container direction="column" alignItems="center">
          <img className="logo" src={logo} alt="logo" width="190px" height="81px" />
          <h6 className="title">Iniciar sesi??n</h6>
          <span className="text">Ingresa tus credenciales</span>
          {errorServer && 
            <span className="text --error">{errorServer}</span>
          }
            <FormInput 
              type="text"
              className={"form-input " + (errors.email ? "--error" : '') } 
              placeholder="Ingresa correo electr??nico" 
              {...register("email", { 
                required: true, 
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Formato de correo incorrecto"
                }})
              }
              />
            <FormInput 
              type="password"
              className={"form-input " + (errors.password ? "--error" : '') } 
              placeholder="Ingresa contrase??a"
              {...register("password", { required: true })}
              />
            <Grid item container justify="center">
              {/* <FormCheckbox>Recu??rdame</FormCheckbox> */}
              <Link className="link" to="/auth/password">Olvid?? mi contrase??a</Link>
            </Grid>
            <br></br>
            <br></br>
            <Button className="btn --primary" type="submit">
              { loading ? <FontAwesomeIcon icon={faSpinner} spin size="2x"/> : 'Ingresar'}
            </Button>
        </Grid>
      </Container>
    </form>
  )
};

export default Login;
