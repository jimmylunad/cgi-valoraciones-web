/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import useFetch from "services/useFetch";
import Header from "shared/Header";
import { useForm } from "react-hook-form";
import { OptionsAssignment } from "types/assignment";
import Option from "./Option";
import List from "./List";
import "./styles.scss";
import Footer from "shared/Footer";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";

const AssignmentNew = (): JSX.Element => {

  const history = useHistory();
  const [options, setOptions] = useState<OptionsAssignment | any>();
  const [responseServer, setResponseServer] = useState<{
    severity: "success" | "error",
    message: string,
  } | null>(null);

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

  const { fetch:submitPost, loading:loadingPost } = useFetch({
    config: {
      url: '/v1/app/supervisor/assignment',
      method: 'POST'
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
    } 
  } = useForm<any>({
    defaultValues: {
      addresses: null
    }
  });


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

  const updateAddress = (address:any) => {
    setValue('addresses', address);
  }

  useEffect(() => {
    getDependecyOptions('flote', 'plate'); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("flote")]);

  useEffect(() => {
    getDependecyOptions('route', 'address'); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("route")]);

  const onSubmit = useCallback(async (data:any) => {
    if (!loadingPost) {

      const response = await submitPost({
        data: {
          fleet: data.flote.value,
          plate: data.plate.value,
          route: data.route.value,
          scheduled_date: data.date.value,
          management: data.management.value,
          contractor: data.contractor.value,
          addresses: data.addresses,
        }
      })

      setResponseServer({
        severity: response.success ? 'success' : 'error',
        message: response.message
      });
      setTimeout(() => {
        reset();
        history.push('/');
      }, 4000);   
    }
  }, [submitPost]);

  useEffect(() => {
    getMainOptions();
  }, []);

  useEffect(() => {
    register('addresses', { required: true})
  }, []);

  return (
    <>
      <Header link="/" title="Nueva programación" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tab__wrapper">
          <Container maxWidth="md" className="tab__container">
            <Grid container className="form" alignItems="center" justify="center">
              <Grid item xs={12}>
                
              {
                !loading && options &&
                <>
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
                    updateAddress={(values) => {
                      updateAddress(values)
                    }}
                  />              

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
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Grid>
            {
              responseServer &&
              <>
                <br></br>
                {
                  <Alert  severity={responseServer.severity}>
                    {responseServer.message}
                  </Alert>
                }
              </>
            }
          </Container>
          <Footer 
            type={"submit"} 
            title={"GUARDAR"} 
            iconColor="#0cc665"
            icon={faCheckCircle} 
            loading={loadingPost}
          />       
        </div>
      </form>   
    </>
  )
};

export default AssignmentNew;