/* eslint-disable react-hooks/exhaustive-deps */
import { faBookmark, faSignOutAlt, IconDefinition, faUser, faBell, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import './styles.scss';
import logo from '../../../images/logo.png';
import useFetch from 'services/useFetch';
import { useCallback, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { ROLE } from 'types/global';
import { AuthDataContext } from 'providers/Auth/provider';
import { IAuthState } from 'providers/Auth/reducer';
import { DBDataContext } from 'providers/DB/provider';
import { IDBState } from 'providers/DB/reducer';

const Loading = (): JSX.Element => (
  <li className="list__option">
    <Grid container>
      <Grid item xs={2}>
        <Skeleton height={50} width={30}></Skeleton>
      </Grid>
      <Grid item>
        <Skeleton height={25} width={160}></Skeleton>
        <Skeleton height={25} width={120}></Skeleton>
      </Grid>
    </Grid>
    <br></br>
  </li>
)

type OptionsMenu = {
  title:  string,
  icon: IconDefinition,
  subtitle?: string,
  link: string,
  bg?: string,
  color?: string,
}

type OptionsMenuRole = {
 [name: string]: OptionsMenu[],
}

const Home = ():JSX.Element => {

  const { db, online } = useContext<IDBState>(DBDataContext);

  const history = useHistory();
  const { plate, role } = useContext<IAuthState>(AuthDataContext);
  const [isCounter, setCounter] = useState<number>(0);
  const [isRating, setRating] = useState<number>(0);
  const MENU: OptionsMenuRole = {
    [`${ROLE.operator}`]: [
      { title: 'Programaciones', subtitle: 'Listado', link: '/programaciones', icon: faBookmark, bg: '#fae2e4', color: '#f64e60' },
      // { title: 'Historial', subtitle: 'Programaciones', link: '/historial', icon: faHistory, bg: '#fdf4dd', color: '#f4a832' },
      { title: 'Cerrar sesión', link: '/logout', icon: faSignOutAlt, bg: '#eee4ff', color: '#8851fc' },
    ],
    [`${ROLE.supervisor}`]: [
      { title: 'Programaciones', subtitle: 'Listado', link: '/programaciones/1', icon: faBookmark, bg: '#fae2e4', color: '#f64e60' },
      { title: 'Nueva', subtitle: 'Programación', link: '/programaciones/nueva', icon: faBell, bg: '#befaf4', color: '#3bccc0' },
      { title: 'Cerrar sesión', link: '/logout', icon: faSignOutAlt, bg: '#eee4ff', color: '#8851fc' },
    ], 
  }

  const { fetch:submitPost, loading:loadingPost } = useFetch({
    config: {
      url: '/v1/app/assignment',
      method: 'POST'
    }
  })

  const { fetch, loading:loadingAssignment } = useFetch({
    loading: online,
    config: {
      url: '/v1/app/assignment',
    }
  })

  const { fetch:fetchCombo, loading:loadingCombo } = useFetch({
    loading: online,
    config: {
      url: '/v1/app/assignment/combo',
    }
  })

  const { fetch:fetchDates, loading:loadingDates } = useFetch({
    loading: online,
    config: {
      url: '/v1/app/assignment/schedule',
    }
  });

  const getData = useCallback(async () => {
    const response = await fetch({
      params: {
        ...ROLE.supervisor === role ? { show: 'scheduled'} : {},
        type: 1,
      }
    }); 

    
    if (response.success) {
      localStorage.setItem('assignments', JSON.stringify(response.data));
      response.data.forEach(async (element: any) => await db.table("assignments").put(element));
    };

    const responseCombo = await fetchCombo({});
    if (responseCombo.success) {
      localStorage.setItem('combo', JSON.stringify(responseCombo.data));
    }

    const responseDates = await fetchDates({});
    if (responseDates.success) {
      localStorage.setItem('dates', JSON.stringify(responseDates.data));
    }
  }, []);

  const getCountAssigments = useCallback(async () => {
    const countAssignments = await db.table("assignments").count();
    setCounter(countAssignments);
  }, []);

  const getCountRating = useCallback(async () => {
    const countRating = await db.table("rating").count();
    setRating(countRating);
  }, []);


  const asyncData = useCallback(async () => {
    const data: any[] = await db.table("rating").toArray();

    const processData = async (index: number) => {
      if (index === data.length) {
        getCountRating();
        return;
      }

      const { file, id_assignment,  ...rest } = data[index];

      setTimeout(async () => {
        
        const bodyFormData = new FormData();
        bodyFormData.set('id', id_assignment);
        bodyFormData.set('id_option', rest.id_option);
        bodyFormData.set('observation', rest.observation);
        bodyFormData.set('latitud', rest.latitud);
        bodyFormData.set('longitud', rest.longitud);

        file.forEach((currentFile: any, index: number) => {
          const metadata = {
            type: 'image/jpeg'
          };
          bodyFormData.set('file_' + index, new File([currentFile], "file_" + index+ ".jpg", metadata));
        });


        const response = await submitPost({
          config: {
            headers: { "Content-Type": "multipart/form-data" },
          },
          data: bodyFormData
        });

        if (response.success) db.table('rating').delete(parseInt(rest.id));

        
        return processData(index + 1);

      }, index === 0 ? 0 : 1000);
    }

    processData(0);
  }, [db]);

  useEffect(() => {
    if (online) getData();
    getCountAssigments();
    getCountRating();    
  }, []);

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
            <div className="title__box">
              <h1>Dashboard</h1>
              <h2>{plate}</h2>
            </div>
            {
            !loadingAssignment && !loadingCombo && !loadingDates ?
              <p>Tienes {isCounter} programaciones pendientes</p> :
              <Skeleton height={20} width={180} />
            }
          </div>
          <ul className="menu">
            {
              !loadingAssignment && !loadingCombo && !loadingDates ?
              <>
              {
                MENU[role].map(option => (
                  <li 
                    className="menu__option" 
                    key={option.link} 
                    onClick={() => {
                      history.push(option.link);
                    }}
                  >
                    <Grid container alignItems="center" > 
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
              {
                online && isRating > 0 &&
                <li
                  className="menu__option"
                  onClick={() => {
                    asyncData();
                  }}
                >
                  <Grid container alignItems="center" > 
                    <Grid item className="menu__icon" style={{background: '#ad24ad'}}> 
                    {
                      loadingPost ? 
                      <FontAwesomeIcon icon={faSpinner} spin color={"#FFFFFF"}/> :
                      <FontAwesomeIcon icon={faSync} color="#FFFFFF"></FontAwesomeIcon>               
                    }
                    </Grid>
                    <Grid item xs={8}>
                      <p>Subir datos</p>
                      <h6>Offline</h6>
                    </Grid>
                  </Grid>
                </li>
              }
              </>
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

export default Home;
