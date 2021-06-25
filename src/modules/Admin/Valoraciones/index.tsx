import { faClipboardList, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '@material-ui/core';
import Header from 'shared/Header';
import './styles.scss';

const Valoraciones = (): JSX.Element => {

  return (
  <>
    <Header link="/" title="Lista de valoraciones" />
    <div className="tab__wrapper">
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
                    <h6>Hace 15 min.</h6>
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
                    <h6>Hace 15 min.</h6>
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

export default Valoraciones;