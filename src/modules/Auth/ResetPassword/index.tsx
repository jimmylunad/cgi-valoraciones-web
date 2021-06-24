import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput } from "components/Form";
import { useHistory } from "react-router";
import "./styles.scss";

const ResetPassword = ():JSX.Element => {
  const history = useHistory();

  const goBack = () => {
    ;
  }
  return (
    <Container maxWidth="md" className="container">
      <Grid container direction="column" alignItems="center">
        <img className="logo" src="https://via.placeholder.com/150" alt="logo"></img>
        <h6 className="title">¿Olvidaste tu contraseña?</h6>
        <span className="text">Ingresa tu correo electrónico registrado</span>
        <FormInput 
          type="text"
          className="form-input" 
          placeholder="Ingresa correo electrónico" />
        
        <br></br>
        <Grid container>
          <Grid item xs={8}>
            <Button className="btn --primary w-95"> Recuperar contraseña</Button>
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
  )
};

export default ResetPassword;
