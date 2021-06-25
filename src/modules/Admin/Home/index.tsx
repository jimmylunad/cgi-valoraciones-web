import { faBookmark, faHistory, faBell, faSignOutAlt, IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import './styles.scss';
import logo from '../../../images/logo.png';

type OptionsMenu = {
  title:  string,
  icon: IconDefinition,
  subtitle?: string,
  link: string,
  bg?: string,
  color?: string,
}

const Home = ():JSX.Element => {
  const [cookies] = useCookies(["token"]);

  const history = useHistory();
  const MENU: OptionsMenu[] = [
    { title: 'Valoraciones', subtitle: 'Listado', link: '/valoraciones', icon: faBookmark, bg: '#fae2e4', color: '#f64e60' },
    { title: 'Historial', subtitle: 'Valoraciones', link: '/historial', icon: faHistory, bg: '#fdf4dd', color: '#f4a832' },
    { title: 'Notificaciones', subtitle: 'Historial', link: '/notificaciones', icon: faBell, bg: '#c8f7f4', color: '#5ec6bd'},
    { title: 'Cerrar sesión', link: '/logout', icon: faSignOutAlt, bg: '#eee4ff', color: '#8851fc' },
  ];

  return (
  <>
    <nav className="nav-header">
      <Container maxWidth="md" className="nav-header__container">
        <Grid container justify="center" alignItems="center">
          <Grid xs={6} item>
            <figure className="logo">
              <img src={logo} alt="Logo" />
            </figure>
          </Grid>
          <Grid xs={6} item container justify="flex-end">
            <div className="user">
              <FontAwesomeIcon icon={faUser} color="#b5b4c4"></FontAwesomeIcon>  
            </div>
          </Grid>
        </Grid>
      </Container>
    </nav>
    <div className="wrapper">
      <Container maxWidth="md">
        <div className="card">
          <div className="card__title">
            <h1>Dashboard</h1>
            <p>Tienes {cookies.pendingAssignment} valoraciones pendientes</p>
          </div>
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
                      <p>{option.title}</p>
                      <h6>{option.subtitle}</h6>
                    </Grid>
                  </Grid>
                </li>
              ))
            }
          </ul>
        </div>
      </Container>
    </div>
  </>)
};

export default Home;
