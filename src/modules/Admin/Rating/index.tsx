/* eslint-disable react-hooks/exhaustive-deps */
import { faCamera,  faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import Header from 'shared/Header';
import { Assignment } from 'types/assignment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { FormLabel, FormSelect, FormTextarea  } from 'components/Form';
import Footer from 'shared/Footer';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import useFetch from 'services/useFetch';
import { Alert } from '@material-ui/lab';

type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Rating = (): JSX.Element => {

  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [subOptions, setSuboptions] = useState<any>(null);
  const [requestStatus, setRequestStatus] = useState<null | boolean | string>(null);
  const [assignment, setAssignment] = useState<Assignment | any>({});
  
  const { fetch:submitPost, loading:loadingPost } = useFetch({
    config: {
      url: '/v1/app/assignment',
      method: 'POST'
    }
  })

  
  const { fetch, loading } = useFetch({
    loading: false,
    config: {
      url: '/v1/app/assignment/detail/' + params.id,
    }
  })

  const getData = async () => {
    const response = await fetch({}); 
    if (response.success) {
      setAssignment(response.data);
    }
  };

  const getDataStorage = () => {
    const assignments: any = localStorage.getItem("assignments");
    setAssignment(JSON.parse(assignments)[params.index])
  }

  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    getValues,
    control,
    reset,
    formState: { 
      errors 
    } 
  } = useForm<any>({
    defaultValues: {
      id: null,
      id_option_1: null,
      id_option_2: null, 
      id_option_3: null, 
      observation: null,
      latitud: null,
      longitud: null,
    }
  });

  const combo:any = useMemo((): Assignment[] => {
    const assignments: any = localStorage.getItem("combo");
    return JSON.parse(assignments);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setValue("latitud", position.coords.latitude);
      setValue("longitud", position.coords.longitude);      
    });
  },[]);

  const onChange = (event:any) => {
    const file:any = event.target.files[0];
    // const [file] = imgInp.files
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const onSubmit = useCallback(async (data:any) => {
    if (!loadingPost) {
      const bodyFormData = new FormData();
      bodyFormData.set('id', data.id);
      bodyFormData.set('id_option_1', data.id_option_1);
      bodyFormData.set('id_option_1', data.id_option_1);
      bodyFormData.set('id_option_2', data.id_option_2);
      bodyFormData.set('id_option_3', data.id_option_3);
      bodyFormData.set('observation', data.observation);
      bodyFormData.set('latitud', data.latitud);
      bodyFormData.set('longitud', data.longitud);
      bodyFormData.set('file', data.file);
      
      const response = await submitPost({
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
        data: bodyFormData
      })

      setRequestStatus(response.success ? true : response.message);
      setTimeout(() => {
        reset();
        setRequestStatus(null);
      }, 4000);   
    }
  }, [submitPost]);

  useEffect(() => {
    setValue("id_option_2", null);
    setValue("id_option_3", null);
    setValue("observation", null);
    if (getValues('id_option_1')) {
      const subOptions = combo.subOptions.find((e:any) => e.id === getValues('id_option_1').value);
      if (subOptions) {
        setSuboptions(subOptions);
      } else {
        setSuboptions(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("id_option_1")]);

  useEffect(() => {
    if (params.id) {
      setIsLocalData(false);
      setValue('id', params.id);
      getData();
    } else {
      setIsLocalData(true);
      setValue('id', params.index);
      getDataStorage();
    }
  }, [params, setValue])
  
  return (
  <>
    <Header 
      link={
        isLocalData ? '/programaciones/informacion/' + params.index:
        '/historial/informacion/' + params.id
      } 
      title={"Valoración " + assignment.code} 
    />
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__wrapper">
        <Container maxWidth="md" className="tab__container">
          <Grid container className="form" alignItems="center" justify="center">
            <Grid item xs={12}>
              <FormLabel>Seleccione 1</FormLabel>
              <Controller
                name="id_option_1"
                control={control}
                rules={{ required: 'Please select an option'}}
                render={({ field }) => 
                <FormSelect 
                  {...field} 
                  placeholder="Seleccionar"
                  className={"form-select " + (errors.id_option_1 ? '--error' : '')} 
                  options={combo.options.map((e:any) => ({value: e.id, label: e.option, add_input: e.add_input }))} 
                />}
              />
            </Grid>
            {
              subOptions && subOptions.combos.map((option: any, index : number) => (
                <Grid item xs={12}>
                  <FormLabel>{"Seleccione " + (index + 2)}</FormLabel>
                  <Controller
                    name={"id_option_" + String(index + 2)}
                    control={control}
                    rules={{ required: 'Please select an option'}}
                    render={({ field }) => 
                    <FormSelect 
                      {...field} 
                      placeholder="Seleccionar"
                      className={"form-select " + (errors['id_option_' + (index  + 2)] ? '--error' : '')} 
                      options={option.map((e:any) => ({value: e.id, label: e.option }))} 
                    />}
                  />
                </Grid>
              ))
            }

            {
              getValues('id_option_1')?.add_input &&
              <Grid item xs={12}>
                <FormLabel> Observación</FormLabel>
                <FormTextarea {...register('observation')} placeholder="Ingresar observación"></FormTextarea>
              </Grid>
            }
            {
              previewImage &&
              <img className="form__preview" alt="foto" src={previewImage} />
            }
            <label className={"form__file w-90"}>
              <input {...register("file")} onChange={onChange} type="file"></input>
              <span className="btn --outline-info">
                <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                <span>TOMAR / CARGAR FOTO</span>
              </span>
            </label>
          </Grid>
          
          {
            typeof requestStatus === 'boolean' &&
            <>
            <br></br>
              {
                requestStatus === true ? 
                <Alert severity="success"> Información registrada correctamente</Alert>
                : 
                <Alert severity="error"> {requestStatus}</Alert>
              }
            </>
          }
        </Container>
        <Footer loading={loadingPost} type={"submit"} title={"Confirmar"} icon={faCheckCircle} onClick={() => {
        }}></Footer>
      </div>
    </form>

  </>)
};

export default Rating;