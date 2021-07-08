import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import { TabOption } from 'shared/Tabs';
import Header from 'shared/Header';
import Tabs from 'shared/Tabs';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Assignment } from 'types/assignment';
import { useHistory } from 'react-router';
import { FormLabel, FormSelect } from 'components/Form';
import useFetch from 'services/useFetch';
import './styles.scss';
import { Skeleton } from '@material-ui/lab';
import { DBDataContext } from 'providers/DB/provider';
import { IDBState } from 'providers/DB/reducer';


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

const OperatorAssignments = (): JSX.Element => {

  const history = useHistory();
  const { db } = useContext<IDBState>(DBDataContext);
  const [assignments, setAssignments] = useState<Assignment[] | any>([]);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const OPTIONS_TABS: TabOption[] = [
    {title: 'INICIO', link: '/programaciones'},
    {title: 'HISTORIAL', link: '/historial'},
  ];

  const { fetch, loading } = useFetch({
    loading: false,
    config: {
      url: '/v1/app/assignment',
    }
  })


  const dates = useMemo((): Assignment[] => {
    const assignments: any = localStorage.getItem("dates");
    return JSON.parse(assignments);
  }, []);

  const handleChange = async(event:any) => {  
    setIsFilter(!!event);
    const response = await fetch({
      params: {
        type: 1,
        date: event ? event.value : null
      }
    });
    
    if (response.success) {
      setAssignments(response.data)
    }
  }

  useEffect(() => {
      db.assignments.toArray((data:Assignment[]) => {
        setAssignments(data);
      })
    // const assignments: any = localStorage.getItem("assignments");
    // setAssignments(JSON.parse(assignments));
  }, [db.assignments])

  return (
  <>
    <Header link="/" title="Lista de Programaciones" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <br/>
        <Grid item container xs={12}>
          <FormLabel>Filtar fechas</FormLabel>
          <FormSelect
            placeholder="Seleccionar"
            isClearable
            className={"form-select w-100"} 
            onChange={(value:any)  => {handleChange(value)}}
            options={dates.map((e:any) => ({value: e.value, label: e.option }))} 
          />
        </Grid>
        <div className="tab__title">
          <h5>Últimas asignaciones</h5>
        </div>
        <div className="tab__list">
          {
            assignments.length === 0 && 
            <p className="tab__empty">No tiene asignaciones pendientes</p>
          }
          <ul> 
            {
             !loading ? assignments.map((assignment: Assignment, index: number) => (
                <li key={index*2} className="card" 
                  onClick={() => { 
                    if (!isFilter) {
                      history.push('/programaciones/informacion/' + assignment.id)
                    } else {
                      history.push('/programaciones/f-informacion/' + assignment.id)
                    }
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
              )): 
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

export default OperatorAssignments;