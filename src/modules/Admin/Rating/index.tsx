/* eslint-disable react-hooks/exhaustive-deps */
import { faCamera, faCheckCircle, faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import Header from 'shared/Header';
import { Assignment } from 'types/assignment';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { FormLabel, FormSelect, FormTextarea  } from 'components/Form';
import Footer from 'shared/Footer';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import useFetch from 'services/useFetch';
import { Alert } from '@material-ui/lab';
import Button from 'components/Button';
import Summary from './Summary';
import { DBDataContext } from 'providers/DB/provider';
import { IDBState } from 'providers/DB/reducer';
import moment from "moment";

moment.locale('es');

type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Rating = (): JSX.Element => {

  const { db, online } = useContext<IDBState>(DBDataContext);
  const history = useHistory<any>();
  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [isRating, setIsRating] = useState<boolean | null>(null);
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

  const getDataStorage = async () => {
    const assignment: Assignment = await db.table('assignments').get(Number(params.index)); 
    setAssignment(assignment)
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
      id_option: null,
      observation: null,
      latitud: null,
      longitud: null,
    }
  });

  const combo:any = useMemo((): Assignment[] => {
    const assignments: any = localStorage.getItem("combo");
    return JSON.parse(assignments)[isRating ? 'findingOptions' : 'canceledOptions'];
  }, [isRating]);

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
    if (!loadingPost && online) {
      const bodyFormData = new FormData();
      bodyFormData.set('id', data.id);
      bodyFormData.set('id_option', data.id_option.value);
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

      if (response.success) {
        setTimeout(() => {
          reset();
          history.push('/');
        }, 4000);   
      }
    } else {

      let files:any = [];

      images.forEach(image => {
        const reader = new FileReader();
        reader.readAsDataURL(image.file);
        reader.onload= (e) => {
          files.push(reader.result);
        }
      });

      await db.table('assignments').delete(parseInt(data.id));

      setTimeout(() => {
        db.table("rating").add({
          id_assignment: data.id,
          id_option: data.id_option.value,
          observation: data.observation,
          latitud: data.latitud,
          longitud: data.longitud,
          datetime: moment().format('YYYY-MM-DD HH:mm'),
          file: files 
        });

        setResponseServer({
          severity: 'success',
          message: 'Se guardó exitosamente en base datos local',
        });
        setTimeout(() => {
          reset();
          history.push('/');
        }, 4000);  

      }, 100);
    }
  }, [submitPost]);

  // Consulta de las coordenadas
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setValue("latitud", position.coords.latitude);
      setValue("longitud", position.coords.longitude);      
    });

    setIsRating(history.location.pathname.includes('/programacion/'));
  },[]);

  useEffect(() => {
    setValue("observation", null);  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("id_option")]);

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
      title={"Programación " + (assignment.code || '')} 
    />
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__wrapper">
        <Container maxWidth="md" className="tab__container">
          {
            !previewSummary ? 
            <>
              <Grid container className="form" alignItems="center" justify="center">
                <Grid item xs={12}>
                  <FormLabel>{isRating ? 'Hallazgo' : 'Motivo' }</FormLabel>
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
                {
                  getValues('id_option')?.add_input &&
                  <Grid item xs={12}>
                    <FormLabel>{getValues('id_option')?.input_title}</FormLabel>
                    <FormTextarea {...register('observation')} placeholder={`Ingresar ${(getValues('id_option')?.input_title).toLowerCase()}`}></FormTextarea>
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
              isRating={isRating}
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
              title={"GUARDAR"} 
              iconColor="#0cc665"
              icon={faCheckCircle} 
              loading={loadingPost}
            />          
        }
      </div>
    </form>

  </>)
};

export default Rating;