/* eslint-disable react-hooks/exhaustive-deps */
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Button from "components/Button";
import { FormLabel } from "components/Form";
import { DBDataContext } from "providers/DB/provider";
import { IDBState } from "providers/DB/reducer";
import { useCallback, useContext, useEffect, useState } from "react";
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
  const { db, online } = useContext<IDBState>(DBDataContext);
  const { id:idType } = useParams<{ id: string}>();
  const [currentFilter, setCurrentFilter] = useState<string>("scheduled");
  const [dashboardData, setDashboardData] = useState<{
    canceled: number;
    doned: number;
    scheduled: number;
    rescheduled: number;
  }>();
  const OPTIONS_TABS: TabOption[] = [
    {title: 'HOY', link: '/programaciones/1'},
    {title: 'Semana', link: '/programaciones/2'},
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { fetch, loading } = useFetch({
    loading: online,
    config: {
      url: '/v1/app/supervisor/dashboard',
    }
  });

  const { fetch: fetchData, loading:loadingData } = useFetch({
    loading: online,
    config: {
      url: '/v1/app/assignment',
    }
  });

  const getDashboard = useCallback(async () => {
    if (online) {
      const response = await fetch({
        params: {
          type: idType,
        }
      })
      
      setDashboardData(response.data);
    }
  }, [currentFilter, fetch]);

  const getData = useCallback(async () => {
    const response = await fetchData({
      params: {
        type: idType,
        show: currentFilter
      }
    })
    setAssignments(response.data);
  }, [currentFilter]);


  const getDataOffline = useCallback(() => {
    db.assignments.toArray((data:Assignment[]) => {
      setAssignments(data);
    })
  }, []);

  useEffect(() => {
    if (currentFilter !== "" && online)
      getData();
    else 
      getDataOffline();
  }, [currentFilter])

  useEffect(() => {
    setCurrentFilter("");
    setTimeout(() => {
      setCurrentFilter("scheduled");
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

        { !online && idType === "2"  ? 
          
          <>
            <br></br>
            <br></br>
            <FormLabel className="label-center">No tienes conexión, inténtalo mas tarde</FormLabel> 
          </>
          :
          <>

            <Grid container className="filters_buttons">
              <Grid container xs={6} justify="flex-start">
                <Button 
                  className={`btn --blue w-98 ${currentFilter === 'scheduled' ? '--active' : ''}`}
                  onClick={() => {setCurrentFilter('scheduled')}}
                >
                  {loading ? <Skeleton height={50} width={50}></Skeleton> : 
                    <>
                      <span>{online ? dashboardData?.scheduled : assignments.length}</span> Programadas
                    </>
                  }
                </Button>
                <Button 
                  className={`btn --gray w-98 ${currentFilter === 'rescheduled' ? '--active' : ''}`}
                  onClick={() => {setCurrentFilter('rescheduled')}}
                >
                  {loading ? <Skeleton height={50} width={50}></Skeleton> : 
                    <>
                      <span>{online ? dashboardData?.rescheduled : assignments.length}</span> Reprogramadas
                    </>
                  }
                </Button>
              </Grid>
              <Grid container xs={6} justify="flex-end">
                <Button 
                  disabled={!online}
                  className={`btn --yellow w-98 ${currentFilter === 'doned' ? '--active' : ''}`}
                  onClick={() => {setCurrentFilter('doned')}}
                  >
                    {loading? <Skeleton height={50} width={50}></Skeleton> : 
                      <>
                      <span>{online && dashboardData?.doned}</span> 
                      {
                          online ? 'Realizadas' : 'No disponible'
                        }
                      
                      </>
                    }
                </Button>
                <Button 
                  disabled={!online}
                  className={`btn --red w-98 ${currentFilter === 'canceled' ? '--active' : ''}`}
                  onClick={() => { setCurrentFilter('canceled')}}
                >
                  {
                    loading ? <Skeleton height={50} width={50}></Skeleton> : 
                    <>
                      <span>{online && dashboardData?.canceled}</span> 
                      {
                        online ? 'No realizadas' : 'No disponible'
                      }
                    </>
                  }
                </Button>
              </Grid>
            </Grid>
            {
              !loadingData && assignments.length === 0 && 
              <p className="tab__empty">No existen registros</p>
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
          </>
          }
        </div>
      </Container>
    </div>
  </>)
};

export default SupervisorAssignments;