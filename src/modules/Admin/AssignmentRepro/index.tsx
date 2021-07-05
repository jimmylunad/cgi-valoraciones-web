import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, FormLabel, Grid } from "@material-ui/core";
import { FormSelect } from "components/Form";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Footer from "shared/Footer";
import Header from "shared/Header";

const AssignmentRepro = (): JSX.Element => {
  const { 
    handleSubmit, 
    control,
    formState: { 
      errors,
    } 
  } = useForm<any>({
    defaultValues: {
      id: null,
      id_option: null,
      observation: null,
      latitud: null,
      longitud: null,
    }
  });

  const combo:any = useMemo((): any[] => {
   return []
  }, []);

  const onSubmit = useCallback(async (data:any) => {
  }, []);

  return (
    <>
      <Header link="/" title="Programación" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tab__wrapper">
          <Container maxWidth="md" className="tab__container">
            <div className="tab__list">

            <Grid container className="form" alignItems="center" justify="center">
              <Grid item xs={12}>
                <FormLabel>Fecha</FormLabel>
                <Controller
                  name="id_option"
                  control={control}
                  rules={{ required: 'Please select an option'}}
                  render={({ field }) => 
                  <FormSelect
                    {...field} 
                    placeholder="Seleccionar"
                    className={"form-select " + (errors.id_option ? '--error' : '')} 
                    options={combo.map((e:any) => ({value: e.id, label: e.option, add_input: e.addInput, input_title: e.inputTitle }))} 
                  />}
                />
              </Grid>
            </Grid>
          </div>
          </Container>
          <Footer
              type="button"
              title={"GUARDAR"} 
              icon={faCheckCircle} 
              onClick={(event:any) => {
               
              }}
            />
        </div>
      </form>
    </>
  )
};

export default AssignmentRepro;