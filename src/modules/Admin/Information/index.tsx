import { faArrowCircleRight, faChevronCircleRight, faClipboardList, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import { TabOption } from 'shared/Tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import Header from 'shared/Header';
import Tabs from 'shared/Tabs';
import './styles.scss';
import { Assignment } from 'types/assignment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useFetch from 'services/useFetch';
import { useRouteMatch } from 'react-router';
import Button from 'components/Button';

const Loading = (): JSX.Element => (
  <li className="card">
    <Grid container>
      <Grid item xs={2}>
        <Skeleton height={50} width={30}></Skeleton>
      </Grid>
      <Grid item>
        <Skeleton height={25} width={250}></Skeleton>
        <Skeleton height={25} width={230}></Skeleton>
      </Grid>
    </Grid>
  </li>
)

const Information = (): JSX.Element => {

  const { params } = useRouteMatch<{id: string}>();
  const assignments = useMemo(() => {
    const data: any = localStorage.getItem('assignments');
    return JSON.parse(data);
  },[]);

  const [assignment] = useState<Assignment>(assignments[params.id]);
  const OPTIONS_TABS: TabOption[] = [
    {title: 'INFORMACIÓN', link: '/informacion'},
    {title: 'VALORACIÓN', link: '/valoraion'},
  ];

  return (
  <>
    <Header link="/valoraciones" title="Valoración IGC-R-402" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <Grid container className="summary" alignItems="center">
          <Grid item className="summary__icon">
            <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"/>
          </Grid>
          <Grid item>
            <h3 className="summary__title">{assignment.code}</h3>
            <span className="summary__subtitle">{assignment.name}</span>
          </Grid>
        </Grid>
        <Grid container className="detail">
          <Grid item xs={12}>
            <h3 className="detail__title --blue">Detalle</h3>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Fecha R.</h6>
            <span className="detail__value">{assignment.scheduledDate}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Fecha V.</h6>
            <span className="detail__value">{assignment.name}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Duración</h6>
            <span className="detail__value">{"Duración"}</span>
          </Grid>
          <Grid item xs={6} className="detail__grid">
            <h6 className="detail__label">Ruta</h6>
            <span className="detail__value">{assignment.routeName}</span>
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
          <Button className="btn w-20 --outline-error">
            <FontAwesomeIcon icon={faTimesCircle} color="#FF4A44" />
          </Button>
          <Button className="btn w-75 --outline-info">
            <span>VALORAR</span>{" "}
            <FontAwesomeIcon icon={faChevronCircleRight} color="#205390" />
          </Button>
        </div>
      </Container>
    </div>
  </>)
};

export default Information;