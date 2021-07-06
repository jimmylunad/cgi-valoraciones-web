/* eslint-disable react-hooks/exhaustive-deps */
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Button from "components/Button";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "services/useFetch";
import Header from "shared/Header";
import Tabs, { TabOption } from "shared/Tabs";
import { Assignment } from "types/assignment";

const Loading = (): JSX.Element => (
  <li className="card">
    <Grid container>
      <Grid item xs={2}>
        <Skeleton className="skeleton-image" height={50} width={30}></Skeleton>
      </Grid>
      <Grid item>
        <Skeleton height={25} width={250}></Skeleton>
        <Skeleton height={25} width={250}></Skeleton>
        <Skeleton height={25} width={230}></Skeleton>
      </Grid>
    </Grid>
  </li>
)

const SupervisorAssignments = (): JSX.Element => {
  
  const history = useHistory();
  const { id:idType } = useParams<{ id: string}>();
  const [currentFilter, setCurrentFilter] = useState<string>("doned");
  const [dashboardData, setDashboardData] = useState<{
    canceled: number;
    doned: number;
    scheduled: number;
  }>();
  const OPTIONS_TABS: TabOption[] = [
    {title: 'HOY', link: '/programaciones/1'},
    {title: 'Semana', link: '/programaciones/2'},
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { fetch, loading } = useFetch({
    loading: true,
    config: {
      url: '/v1/app/supervisor/dashboard',
    }
  });

  const { fetch: fetchData, loading:loadingData } = useFetch({
    loading: true,
    config: {
      url: '/v1/app/assignment',
    }
  });

  const getDashboard = useCallback(async () => {
    const response = await fetch({
      params: {
        type: idType,
      }
    })

    setDashboardData(response.data);
  }, [currentFilter, fetch]);

  const getData = useCallback(async () => {
    const response = await fetchData({
      params: {
        type: idType,
        show: currentFilter
      }
    })
    setAssignments(response.data);
  }, [currentFilter])

  useEffect(() => {
    if (currentFilter !== "")
      getData();
  }, [currentFilter])

  useEffect(() => {
    setCurrentFilter("");
    setTimeout(() => {
      setCurrentFilter("doned");
    }, 100);
    getDashboard();
  },[idType])


  return (
  <>
    <Header link="/" title="Lista de Programaciones" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <div className="tab__list">
          
          <Grid container className="filters_buttons">
            <Grid xs={6}>
              <Button 
                className={`btn --blue w-98 ${currentFilter === 'doned' ? '--active' : ''}`}
                onClick={() => {setCurrentFilter('doned')}}
              >
                {loading ? <Skeleton height={50} width={50}></Skeleton> : 
                  <>
                    <span>{dashboardData?.doned}</span> Realizadas
                  </>
                }
              </Button>
            </Grid>
            <Grid container xs={6} justify="flex-end">
              <Button 
                className={`btn --yellow w-98 ${currentFilter === 'scheduled' ? '--active' : ''}`}
                onClick={() => {setCurrentFilter('scheduled')}}
                >
                   {loading ? <Skeleton height={50} width={50}></Skeleton> : 
                    <>
                     <span>{dashboardData?.scheduled}</span> Programadas
                    </>
                   }
              </Button>
              <Button 
                className={`btn --red w-98 ${currentFilter === 'canceled' ? '--active' : ''}`}
                onClick={() => {setCurrentFilter('canceled')}}
              >
                {
                  loading ? <Skeleton height={50} width={50}></Skeleton> : 
                  <>
                    <span>{dashboardData?.canceled}</span> No realizadas
                  </>
                }
              </Button>
            </Grid>
          </Grid>
          {
            !loadingData && assignments.length === 0 && 
            <p className="tab__empty">No tiene asignaciones pendientes</p>
          }
          <ul> 
            {
              !loadingData ? assignments.map((assignment, index) => (
                <li key={index*2} className="card" onClick={() => { history.push('/programaciones/informacion/' + assignment.id )}}>
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

export default SupervisorAssignments;