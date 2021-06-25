import { useForm } from "react-hook-form";
import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { FormInput } from "components/Form";
import { useHistory } from "react-router";
import "./styles.scss";

const ResetPassword = ():JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" className="container">
        <Grid container direction="column" alignItems="center">
          <img className="logo" src="https://via.placeholder.com/150" alt="logo"></img>
          <h6 className="title">¿Olvidaste tu contraseña?</h6>
          <span className="text">Ingresa tu correo electrónico registrado</span>
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
              <Button className="btn --primary w-95" type="submit"> Recuperar contraseña</Button>
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
