/* eslint-disable react-hooks/exhaustive-deps */
import { faCamera, faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import Header from 'shared/Header';
import { Assignment } from 'types/assignment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { FormLabel, FormSelect, FormTextarea  } from 'components/Form';
import Footer from 'shared/Footer';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import useFetch from 'services/useFetch';
import { Alert } from '@material-ui/lab';
import Button from 'components/Button';
import Summary from './Summary';

type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Rating = (): JSX.Element => {

  const history = useHistory();
  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [images, setImages] = useState<{preview: string, file: any}[]>([]);
  // const [subOptions, setSuboptions] = useState<any>(null);
  const [responseServer, setResponseServer] = useState<{
    severity: "success" | "error",
    message: string,
  } | null>(null);
  const [assignment, setAssignment] = useState<Assignment | any>({});
  const [previewSummary, setPreviewSummary] = useState<boolean>(false);
  
  const { fetch:submitPost, loading:loadingPost } = useFetch({
    config: {
      url: '/v1/app/assignment',
      method: 'POST'
    }
  })

  
  const { fetch } = useFetch({
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
    setAssignment(JSON.parse(assignments).find((e: { id: number; }) => e.id === parseInt(params.index)));
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
      errors,
      isValid,
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

  const onChangeImages = (event:any) => {
    let currentImages = [...images];
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      
      const file:any = files[index];
      // const [file] = imgInp.files
      if (file) {
        currentImages.push({
          preview: URL.createObjectURL(file),
          file,
        });
        setImages(currentImages); 
      }
    }
  }

  const onDeleteImages = (index:number)  =>{
    let currentImages = [...images];
    currentImages.splice(index, 1);
    setImages(currentImages);
  }

  const onSubmit = useCallback(async (data:any) => {
    if (!loadingPost) {
      const bodyFormData = new FormData();
      bodyFormData.set('id', data.id);
      bodyFormData.set('id_option_1', data.id_option_1.value);
      bodyFormData.set('id_option_2', data.id_option_2?.value || null);
      bodyFormData.set('id_option_3', data.id_option_3?.value || null);
      bodyFormData.set('observation', data.observation);
      bodyFormData.set('latitud', data.latitud);
      bodyFormData.set('longitud', data.longitud);

      images.forEach((image, index: number) => {
        bodyFormData.set('file_' + index , image.file);
      })
      
      const response = await submitPost({
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
        data: bodyFormData
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

  // Consulta de las coordenadas
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setValue("latitud", position.coords.latitude);
      setValue("longitud", position.coords.longitude);      
    });
  },[]);

  useEffect(() => {
    // setValue("id_option_2", null);
    // setValue("id_option_3", null);
    setValue("observation", null);
    // if (getValues('id_option_1')) {
    //   const subOptions = combo.subOptions.find((e:any) => e.id === getValues('id_option_1').value);
    //   if (subOptions) {
    //     setSuboptions(subOptions);
    //   } else {
    //     setSuboptions(null);
    //   }
    // }
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
      title={"Programación " + assignment.code} 
    />
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__wrapper">
        <Container maxWidth="md" className="tab__container">
          {
            !previewSummary ? 
            <>
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
                      options={combo.options.map((e:any) => ({value: e.id, label: e.option, add_input: e.addInput, input_title: e.inputTitle }))} 
                    />}
                  />
                </Grid>
                {/* {
                  subOptions && subOptions.combos.map((option: any, index : number) => (
                    <Grid item xs={12} key={'option-' + option.id}>
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
                } */}
                {
                  getValues('id_option_1')?.add_input &&
                  <Grid item xs={12}>
                    <FormLabel>{getValues('id_option_1')?.input_title}</FormLabel>
                    <FormTextarea {...register('observation')} placeholder={`Ingresar ${(getValues('id_option_1')?.input_title).toLowerCase()}`}></FormTextarea>
                  </Grid>
                }
                <Grid container>
                  <FormLabel>{"Evidencias"}</FormLabel>
                  <label className={"form__file w-100"}>
                    <input onChange={onChangeImages} accept="image/*" type="file" multiple></input>
                    <span className="btn --outline-info">
                      <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                      <span>TOMAR / CARGAR FOTO</span>
                    </span>
                    <br></br>
                    <br></br>
                  </label>
                </Grid>

                <Grid container className="form__preview">
                  {
                    images.map((image, index) => (
                      <Grid item xs={4} key={index} >
                        <div className="form__preview-wrapper" 
                          style={{ background: `url('${image.preview}')`}}
                        >
                          <Button className={"btn --cancel"} onClick={() => {
                            onDeleteImages(index)
                          }}>
                            <FontAwesomeIcon icon={faTimes} /> 
                          </Button>
                        </div>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </>
            :
            <Summary 
              assignment={assignment}
              success={() => {}} 
              cancel={() => {}} 
              form={getValues()}
              images={images}
            />
          }
          
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
        {
          !previewSummary ?
            <Footer 
              type="button"
              title={"SIGUIENTE"} 
              icon={faChevronCircleRight} 
              onClick={(event:any) => {
                event.preventDefault();
                if (isValid) {
                  setPreviewSummary(true);
                }
              }}
            /> :
            <Footer 
              type={"submit"} 
              title={"VALORAR"} 
              icon={faChevronCircleRight} 
              loading={loadingPost}
            />          
        }
      </div>
    </form>

  </>)
};

export default Rating;