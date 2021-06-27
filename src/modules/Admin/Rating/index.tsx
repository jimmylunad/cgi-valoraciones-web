import { faCamera,  faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import Header from 'shared/Header';
import { Assignment } from 'types/assignment';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { FormLabel, FormSelect  } from 'components/Form';
import Footer from 'shared/Footer';
import './styles.scss';

type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Rating = (): JSX.Element => {

  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [assignment] = useState<Assignment | any>({});
  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  useEffect(() => {
    if (params.id) {
      setIsLocalData(false);
    } else {
      setIsLocalData(true);
    }
  }, [params])

  return (
  <>
    <Header 
      link={
        isLocalData ? '/programaciones/informacion/' + params.index:
        '/historial/informacion/' + params.id
      } 
      title={"Valoración " + (assignment.code || '')} 
    />
    <div className="tab__wrapper">
      <Container maxWidth="md" className="tab__container">
        <Grid container className="form" alignItems="center" justify="center">
          <Grid item xs={12}>
            <FormLabel>Seleccione</FormLabel>
            <FormSelect isSearchable={false}  placeholder="Seleccione" options={options}></FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Seleccione</FormLabel>
            <FormSelect isSearchable={false} placeholder="Seleccione" options={options}></FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Seleccione</FormLabel>
            <FormSelect  isSearchable={false} placeholder="Seleccione" options={options}></FormSelect>
          </Grid>
          <label className={"form__file w-90"}>
            <input name="file" type="file"></input>
            <span className="btn --outline-info">
              <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
              <span>TOMAR / CARGAR FOTO</span>
            </span>
          </label>
        </Grid>
      </Container>
      <Footer loading={false} title={"Confirmar"} icon={faCheckCircle} onClick={() => {
        alert("click")
      }}></Footer>
    </div>
  </>)
};

export default Rating;