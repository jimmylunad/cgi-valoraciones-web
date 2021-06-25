import { faBookmark, faHistory, faBell, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import './styles.scss';

type OptionsMenu = {
  title:  string,
  icon: IconDefinition,
  subtitle?: string,
  link: string,
  bg?: string,
  color?: string,
}

const Home = ():JSX.Element => {

  const history = useHistory();
  const MENU: OptionsMenu[] = [
    { title: 'Valoraciones', subtitle: 'Listado', link: '/valoraciones', icon: faBookmark, bg: '#ffe2e5', color: '#f64e60' },
    { title: 'Historial', subtitle: 'Valoraciones', link: '/historial', icon: faHistory, bg: '#fff4de', color: '#ffa800' },
    { title: 'Notificaciones', subtitle: 'Notificaciones', link: '/notificaciones', icon: faBell, bg: '#c9f7f5', color: '#1bc5bd'},
    { title: 'Cerrar sesión', link: '/logout', icon: faSignOutAlt, bg: '#8950fc', color: '#eee5ff' },
  ];

  return (
  <>
    <nav className="nav-header">
      <Container maxWidth="md" className="nav-header__container">
        <Grid container justify="center">
          <Grid xs={6} item>
            <p>Logo</p>
          </Grid>
          <Grid xs={6} item container justify="flex-end">
            <p>Usuario</p>
          </Grid>
        </Grid>
      </Container>
    </nav>
    <div className="wrapper">
      <div className="card">
        <ul className="menu">
          {
            MENU.map(option => (
              <li className="menu__option" onClick={() => {
                history.push(option.link);
              }}>
                <Grid container alignItems="center"> 
                  <Grid item className="menu__icon" style={{background: option.bg}}> 
                    <FontAwesomeIcon icon={option.icon} color={option.color}></FontAwesomeIcon>               
                  </Grid>
                  <Grid item xs={8}>
                    <h6>{option.title}</h6>
                    <p>{option.subtitle}</p>
                  </Grid>
                </Grid>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </>)
};

export default Home;
