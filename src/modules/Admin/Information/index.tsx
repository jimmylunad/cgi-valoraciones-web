/* eslint-disable react-hooks/exhaustive-deps */
import { faChevronCircleRight, faTimes, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import Header from 'shared/Header';
import './styles.scss';
import { Assignment } from 'types/assignment';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Button from 'components/Button';
import useFetch from 'services/useFetch';


type QueryProps = {
  id:string; // Consultar data
  index: string; // Id almacenado en localstorage
}

const Information = (): JSX.Element => {

  const history = useHistory();
  const { params } = useRouteMatch<QueryProps>();
  const [isLocalData, setIsLocalData] = useState<boolean | null>(null);
  const [assignment, setAssignment] = useState<Assignment | any>({});
  
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
    setAssignment(JSON.parse(assignments).find((e: { id: number; }) => e.id === parseInt(params.index)))
  }

  useEffect(() => {
    if (params.id) {
      setIsLocalData(false);
      getData();
    } else {
      setIsLocalData(true);
      getDataStorage();
    }
  }, [params])
  

  return (
  <>
    <Header 
      link={ isLocalData ?  "/programaciones" : "/historial"} 
      loading={loading} 
      title={"Programación " + assignment.code } 
    />
    <div className="tab__wrapper">
      <Container maxWidth="md" className="tab__container">
        <Grid container className="summary" alignItems="center">
          <Grid item className="summary__icon">
            <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"/>
          </Grid>
          <Grid item>
            <h3 className="summary__title">{assignment.code}</h3>
            <span className="summary__subtitle">{assignment.addresName}</span>
          </Grid>
        </Grid>
        <Grid container className="detail">
          <Grid item xs={12}>
            <h3 className="detail__title --blue">Detalle</h3>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Fecha Programada</h6>
            <span className="detail__value">{assignment.scheduledDate}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Fecha de Atención</h6>
            <span className="detail__value">{assignment.dateAttended}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Ruta</h6>
            <span className="detail__value">{assignment.routeName}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Estado</h6>
            <span className="detail__value">{assignment.status}</span>
          </Grid>
          <Grid item xs={12} className="detail__grid">
            <h6 className="detail__label">Contratista</h6>
            <span className="detail__value">{assignment.contractor}</span>
          </Grid>
          <Grid item xs={12} className="detail__grid">
            <h6 className="detail__label">Gerencia</h6>
            <span className="detail__value">{assignment.management}</span>
          </Grid>
        </Grid>
        <div className="actions">
          <Button
            className="btn --reject"
            onClick={() => {
              isLocalData ? history.push('/programaciones/programacion/' + params.index):
              history.push('/historial/programacion/' + params.id) 
            }}
          >
            <FontAwesomeIcon icon={faTimes} color="#FFFFFF" />
          </Button>
          <Button 
            className="btn --outline-info"
            onClick={() => {
              isLocalData ? history.push('/programaciones/programacion/' + params.index):
              history.push('/historial/programacion/' + params.id) 
            }}
          >
            <span>VALORAR</span>{" "}
            <FontAwesomeIcon icon={faChevronCircleRight} color="#205390" />
          </Button>
        </div>
      </Container>
    </div>
  </>)
};

export default Information;