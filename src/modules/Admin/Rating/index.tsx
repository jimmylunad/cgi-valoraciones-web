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

type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Rating = (): JSX.Element => {

  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [assignment] = useState<Assignment | any>({});
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [subOptions, setSuboptions] = useState<any>(null);

  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    getValues,
    control,
    formState: { 
      errors 
    } 
  } = useForm<any>({
    defaultValues: {
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

  useEffect(() => {
    if (params.id) {
      setIsLocalData(false);
    } else {
      setIsLocalData(true);
    }
  }, [params])

  const onChange = (event:any) => {
    const file:any = event.target.files[0];
    // const [file] = imgInp.files
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const onSubmit = useCallback(async (data: any) => {
    console.log("daata", data)
  }, []);

  useEffect(() => {
    console.log("id_option_1", getValues("id_option_1"));
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

  return (
  <>
    <Header 
      link={
        isLocalData ? '/valoraciones/informacion/' + params.index:
        '/historial/informacion/' + params.id
      } 
      title={"Valoración " + (assignment.code || '')} 
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
        </Container>
        <Footer loading={false} type={"submit"} title={"Confirmar"} icon={faCheckCircle} onClick={() => {
        }}></Footer>
      </div>
    </form>

  </>)
};

export default Rating;