import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '@material-ui/core';
import { TabOption } from 'shared/Tabs';
import Header from 'shared/Header';
import Tabs from 'shared/Tabs';
import './styles.scss';
import { useMemo } from 'react';
import { Assignment } from 'types/assignment';
import { useHistory } from 'react-router';

const OperatorAssignments = (): JSX.Element => {

  const history = useHistory();
  const OPTIONS_TABS: TabOption[] = [
    {title: 'INICIO', link: '/programaciones'},
    {title: 'HISTORIAL', link: '/historial'},
  ];

  const assignments = useMemo((): Assignment[] => {
    const assignments: any = localStorage.getItem("assignments");
    return JSON.parse(assignments);
  }, []);

  return (
  <>
    <Header link="/" title="Lista de Programaciones" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
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

export default OperatorAssignments;