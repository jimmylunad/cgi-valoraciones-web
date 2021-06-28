/* eslint-disable react-hooks/exhaustive-deps */
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import { TabOption } from 'shared/Tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import Header from 'shared/Header';
import Tabs from 'shared/Tabs';
import './styles.scss';
import { Assignment } from 'types/assignment';
import { useCallback, useEffect, useState } from 'react';
import useFetch from 'services/useFetch';
import { useHistory } from 'react-router';

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

const Historial = (): JSX.Element => {

  const history = useHistory();
  const OPTIONS_TABS: TabOption[] = [
    {title: 'INICIO', link: '/programaciones'},
    {title: 'HISTORIAL', link: '/historial'},
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { fetch, loading } = useFetch({
    loading: true,
    config: {
      url: '/v1/app/assignment?type=2',
    }
  })

  const getData = useCallback(async () => {
    const response = await fetch({}); 
    if (response.success) {
      setAssignments(response.data);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData])

  return (
  <>
    <Header link="/" title="Historial" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <div className="tab__title">
          <h5>Historial de asignaciones</h5>
        </div>
        <div className="tab__list">
          <ul>
            {
             !loading ? assignments.map((assignment, index) => (
              <li 
                className="card"
                key={index *2} 
                onClick={() => {
                history.push('/historial/informacion/' + assignment.id)
              }}>
                <div className="assignment">
                  <div className="assignment__ico">
                    <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"></FontAwesomeIcon>
                  </div>
                  <div className="assignment__detail">
                    <div className="detail__superior">
                      <h2>{assignment.code}</h2>
                      <h6>{assignment.scheduledDate}</h6>
                    </div>
                    <div className="detail__inferior">
                      <p>{assignment.addresName}</p>
                      <p>{assignment.routeName}</p>
                      <p>{assignment.contractor}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))
            :
            Array(3).fill(2).map((e, index) => (
              <Loading key={index*2}/>
            ))
            }
          </ul>
        </div>
      </Container>
    </div>
  </>)
};

export default Historial;