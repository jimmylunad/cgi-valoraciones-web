import { useForm } from "react-hook-form";
import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput } from "components/Form";
import { useHistory } from "react-router";
import "./styles.scss";
import useFetch from "services/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "./../../../images/logo.png";

const ResetPassword = ():JSX.Element => {
  const { 
    register, 
    handleSubmit, 
    clearErrors,
    setError,
    formState: { errors } 
  } = useForm();

  const history = useHistory();

  const { fetch, loading } = useFetch({
    config: {
      url: '/v1/app/forgetPassword',
      method: 'POST',
    },
    loading: false,
  });

  const onSubmit = async (data: any) => {
    clearErrors("server");
    const response = await fetch({ data });
    if (!response.success) {
      setError("server",{
        type: "string",
        message: response.message,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" className="container">
        <Grid container direction="column" alignItems="center">
          <img className="logo" src={logo} alt="logo"></img>
          <h6 className="title">¿Olvidaste tu contraseña?</h6>
          <span className="text">Ingresa tu correo electrónico registrado</span>
          {errors.server && 
            <span className="text --error">{errors.server.message}</span>
          }
          <FormInput 
            type="text"
            className={"form-input " + (errors.email ? "--error" : '') } 
            placeholder="Ingresa correo electrónico" 
            {...register("email", { 
              required: true, 
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de correo incorrecto"
              }})
            }
          />
          <br></br>
          <Grid container>
            <Grid item xs={8}>
              <Button className="btn --primary w-95" type="submit">
                { loading ? 
                  <FontAwesomeIcon icon={faSpinner} spin size="2x"/> : 'Recuperar contraseña'
                }
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button className="btn --cancel" 
                onClick={() => {
                history.push('/auth/login')
                }}> 
                Cancelar
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
};

export default ResetPassword;
