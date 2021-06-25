import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '@material-ui/core';
import { TabOption } from 'shared/Tabs';
import Header from 'shared/Header';
import Tabs from 'shared/Tabs';
import './styles.scss';

const Historial = (): JSX.Element => {

  const OPTIONS_TABS: TabOption[] = [
    {title: 'INICIO', link: '/valoraciones'},
    {title: 'HISTORIAL', link: '/historial'},
  ];

  return (
  <>
    <Header link="/" title="Lista de valoraciones" />
    <div className="tab__wrapper">
      <Tabs options={OPTIONS_TABS} />
      <Container maxWidth="md" className="tab__container">
        <div className="tab__title">
          <h5>Últimas asignaciones</h5>
        </div>
        <div className="tab__list">
          <ul>
            <li className="card">
              <div className="assignment">
                <div className="assignment__ico">
                  <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"></FontAwesomeIcon>
                </div>
                <div className="assignment__detail">
                  <div className="detail__superior">
                    <h2>IGC-R-402</h2>
                    <h6>20-10-2021</h6>
                  </div>
                  <div className="detail__inferior">
                    <p>LQ - Aglomeración - Punto de acopio</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="card">
              <div className="assignment">
                <div className="assignment__ico">
                  <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"></FontAwesomeIcon>
                </div>
                <div className="assignment__detail">
                  <div className="detail__superior">
                    <h2>IGC-R-402</h2>
                    <h6>20-10-2021</h6>
                  </div>
                  <div className="detail__inferior">
                    <p>LQ - Aglomeración - Punto de acopio</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  </>)
};

export default Historial;