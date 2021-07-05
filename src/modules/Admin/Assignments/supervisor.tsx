import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import Button from "components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import useFetch from "services/useFetch";
import Header from "shared/Header";
import Tabs, { TabOption } from "shared/Tabs";
import { Assignment } from "types/assignment";

const SupervisorAssignments = (): JSX.Element => {
  
  const history = useHistory();
  const [currentFilter, setCurrentFilter] = useState<string>('doned');
  const OPTIONS_TABS: TabOption[] = [
    {title: 'HOY', link: '/programaciones'},
    {title: 'Semana', link: '/semana'},
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { fetch, loading } = useFetch({
    loading: true,
    config: {
      url: '/v1/app/supervisor/dashboard',
    }
  })

  const getData = useCallback(async () => {
    const response = await fetch({
      params: {
        type: currentFilter
      }
    })

    // setAssignments(response.data);
    console.log("response", response)
  }, []);

  useEffect(() => {
    getData();
  }, [currentFilter, getData])

  return (
  <>
    <Header link="/" title="Lista de Programaciones" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <div className="tab__list">
          {/* {
            assignments.length === 0 && 
            <p className="tab__empty">No tiene asignaciones pendientes</p>
          } */}
          <Grid container className="filters_buttons">
            <Grid xs={6}>
              <Button className="btn --blue w-98">
                <span>51</span> Realizadas
              </Button>
            </Grid>
            <Grid container xs={6} justify="flex-end">
              <Button className="btn --yellow w-98"><span>180</span> Programadas</Button>
              <Button className="btn --red w-98"><span>35</span> No realizadas</Button>
            </Grid>
          </Grid>
          <ul> 
            {
             assignments.map((assignment, index) => (
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
            }
          </ul>
        </div>
      </Container>
    </div>
  </>)
};

export default SupervisorAssignments;