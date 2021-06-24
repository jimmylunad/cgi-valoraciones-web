import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput, FormCheckbox } from "components/Form";
import { Link } from "react-router-dom";
import "./styles.scss";

const Login = ():JSX.Element => {
  return (
    <Container maxWidth="md" className="container">
      <Grid container direction="column" alignItems="center">
        <img className="logo" src="https://via.placeholder.com/150" alt="logo"></img>
        <h6 className="title">Iniciar sesión</h6>
        <span className="text">Ingresa tus credenciales</span>
        <FormInput 
          type="text"
          className="form-input" 
          placeholder="Ingresa correo electrónico" />
        <FormInput 
          type="password"
          className="form-input" 
          placeholder="Ingresa contraseña" />
        <Grid item container justify="space-between">
          <FormCheckbox>Recuérdame</FormCheckbox>
          <Link className="link" to="/auth/password">Olvidé mi contraseña</Link>
        </Grid>
        <br></br>
        <br></br>
        <Button className="btn --primary"> Ingresar</Button>
      </Grid>
    </Container>
  )
};

export default Login;
