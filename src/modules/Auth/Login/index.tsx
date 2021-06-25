import { useForm } from "react-hook-form";
import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput, FormCheckbox } from "components/Form";
import { Link } from "react-router-dom";
import "./styles.scss";

const Login = ():JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" className="container">
        <Grid container direction="column" alignItems="center">
          <img className="logo" src="/images/logo.png" alt="logo"/>
          <h6 className="title">Iniciar sesión</h6>
          <span className="text">Ingresa tus credenciales</span>
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
            <FormInput 
              type="password"
              className={"form-input " + (errors.password ? "--error" : '') } 
              placeholder="Ingresa contraseña"
              {...register("password", { required: true })}
              />
            <Grid item container justify="space-between">
              <FormCheckbox>Recuérdame</FormCheckbox>
              <Link className="link" to="/auth/password">Olvidé mi contraseña</Link>
            </Grid>
            <br></br>
            <br></br>
            <Button className="btn --primary" type="submit"> Ingresar</Button>
        </Grid>
      </Container>
    </form>
  )
};

export default Login;
