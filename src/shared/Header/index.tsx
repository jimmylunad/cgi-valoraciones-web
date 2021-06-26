import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import { useHistory } from "react-router"
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss';

type HeaderProps = {
  link: string,
  title?: string;
  loading?: boolean;
}

const Header = ({ link, title, loading }: HeaderProps) => {
  const history = useHistory();
  
  return (
    <nav className="nav-header-tab">
      <Grid container justify="center" alignItems="center">
        <Grid xs={12} item>
          <div className="navbar">
            <div className="navbar__back">
              <FontAwesomeIcon 
                icon={faChevronCircleLeft} 
                color="#FFFFFF" onClick={() => { history.push(link)}} 
              />
            </div>
            <div className="navbar__title">
              {loading ? <Skeleton width={300} height={30} /> : <h1>{title}</h1>}
            </div>
          </div>
        </Grid>
      </Grid>
    </nav>
  )
}

export default Header;