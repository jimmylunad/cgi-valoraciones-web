import { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import useFetch from "services/useFetch";
import Header from "shared/Header";
import { useForm } from "react-hook-form";
import { OptionsAssignment } from "types/assignment";
import Option from "./Option";
import List from "./List";
import "./styles.scss";

const AssignmentNew = (): JSX.Element => {

  const [options, setOptions] = useState<OptionsAssignment | any>();
  const { fetch, loading } = useFetch({
    config: {
      url: '/v1/app/assignment/requestForm'
    }
  });
  
  const { fetch: fetchDependecy } = useFetch({
    config: {
      url: '/v1/app/assignment/requestForm'
    }
  })

  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    getValues,
    control,
    reset,
    formState: { 
      errors,
      isValid,
    } 
  } = useForm<any>();


  const getMainOptions = async () => {
    const response = await fetch({});
    setOptions(response.data);
  }

  const getDependecyOptions = useCallback(async (key: string, updateKey) => {
    if (getValues()[key]) {

      const response = await fetchDependecy({
        params: {
          [key]: getValues()[key].value
        }
      });

      setOptions({
        ...options,
        [updateKey]: response.data[updateKey]
      })
    }
  }, [fetchDependecy, getValues, options]);

  useEffect(() => {
    getDependecyOptions('flote', 'plate'); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("flote")]);

  useEffect(() => {
    getDependecyOptions('route', 'address'); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("route")]);

  useEffect(() => {
    getMainOptions();
  }, []);

  return (
    <>
      <Header link="/" title="Nueva programación" />
      <Container maxWidth="md" className="tab__container">
        <Grid container className="form" alignItems="center" justify="center">
          <Grid item xs={12}>
            
          {
            !loading && options &&
            <>
              <br></br>
              <br></br>
              <br></br>
              <Option
                label="Fecha"
                name="date"
                options={options.date} 
                control={control} 
                errors={errors} 
              />

              <Option 
                label="Flota"
                name="flote"
                options={options.flote} 
                control={control} 
                errors={errors} 
              />
              <Option 
                label="Placa" 
                name="plate"
                options={options.plate} 
                control={control} 
                errors={errors} 
              />
              <Option 
                label="Ruta" 
                name="route"
                options={options.route} 
                control={control} 
                errors={errors} 
              />
              <List 
                options={options.address} 
                prefixName={getValues().route ? getValues().route.value : ''}/>              

              <Option 
                label="Contratista" 
                name="contractor"
                options={options.contractor} 
                control={control} 
                errors={errors} 
              />
              <Option 
                label="Gerencia" 
                name="management"
                options={options.management} 
                control={control} 
                errors={errors} 
              />
            </> 
          }
          </Grid>
        </Grid>
      </Container>
    </>
  )
};

export default AssignmentNew;