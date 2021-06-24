import { faBookmark, faHistory, faBell, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type OptionsMenu = {
  title:  string,
  icon: IconDefinition,
  subtitle?: string,
  link: string,
  bg?: string,
  color?: string,
}

const Home = ():JSX.Element => {

  const MENU: OptionsMenu[] = [
    { title: 'Valoraciones', subtitle: 'Listado', link: '/listado', icon: faBookmark, bg: '#ffe2e5', color: '#f64e60' },
    { title: 'Historial', subtitle: 'Valoraciones', link: '/valoraciones', icon: faHistory, bg: '#fff4de', color: '#ffa800' },
    { title: 'Notificaciones', subtitle: 'Notificaciones', link: '/notificaciones', icon: faBell, bg: '#c9f7f5', color: '#1bc5bd'},
    { title: 'Cerrar sesión', link: '/listado', icon: faSignOutAlt, bg: '#8950fc', color: '#eee5ff' },
  ];

  return (
  <>
    <p>a</p>
  </>)
};

export default Home;
