import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { Assignment } from "types/assignment";
import "./styles.scss";

type SummaryProps = {
  success: () => void,
  cancel: () => void,
  assignment: Assignment,
  form: any,
  images: any[],
}

const Summary  = ({ success, cancel, assignment, form, images }: SummaryProps) => (
  <>
    <Grid container className="summary" alignItems="center">
      <Grid item className="summary__icon">
        <FontAwesomeIcon icon={faClipboardList} color="#b5b4c4"/>
      </Grid>
      <Grid item>
        <h3 className="summary__title">{assignment.code}</h3>
        <span className="summary__subtitle">{assignment.addresName}</span>
      </Grid>
    </Grid>
    <Grid container className="detail">
      <Grid item xs={12}>
        <h3 className="detail__title --blue">Detalle</h3>
      </Grid>
      <Grid item xs={6} className="detail__grid">
        <h6 className="detail__label">Fecha R.</h6>
        <span className="detail__value">{assignment.scheduledDate}</span>
      </Grid>
      <Grid item xs={6} className="detail__grid">
        <h6 className="detail__label">Fecha V.</h6>
        <span className="detail__value">{assignment.date_attended}</span>
      </Grid>
      <Grid item xs={6} className="detail__grid">
        <h6 className="detail__label">Duración</h6>
        <span className="detail__value">{"Duración"}</span>
      </Grid>
      <Grid item xs={6} className="detail__grid">
        <h6 className="detail__label">Ruta</h6>
        <span className="detail__value">{assignment.routeName}</span>
      </Grid>
      <Grid item xs={12} className="detail__grid">
        <h6 className="detail__label">Contratista</h6>
        <span className="detail__value">{assignment.contractor}</span>
      </Grid>
      <Grid item xs={12} className="detail__grid">
        <h6 className="detail__label">Gerencia</h6>
        <span className="detail__value">{assignment.management}</span>
      </Grid>
    </Grid>
    <hr></hr>
    <Grid container className="detail">
      <Grid item xs={12} className="detail__grid --mb">
        <br></br>
        <h6 className="detail__label">Opciones seleccionadas</h6>
        { form.id_option_1 && 
          <p className="detail__value">{form.id_option_1.label}</p>
        }
        { form.id_option_2 && 
          <p className="detail__value">{form.id_option_2.label}</p>
        }
        { form.id_option_3 && 
          <p className="detail__value">{form.id_option_3.label}</p>
        }
      </Grid>

      <Grid item xs={12} className="detail__grid --mb">
        <h6 className="detail__label">Observaciones</h6>
        <p className="detail__value">{form.observation || '-'}</p>
      </Grid>

      <Grid item xs={12} className="detail__grid">
        <h6 className="detail__label">Evidencias</h6>
        { images.length > 0 && (
          <>
            <br></br>
            <Grid container className="form__preview">
              {
                images.map((image, index) => (
                  <Grid item xs={4} key={index} >
                    <div className="form__preview-wrapper" 
                      style={{ background: `url('${image.preview}')`}}
                    >
                    </div>
                  </Grid>
                ))
              }
           </Grid>
          </>
        )}
        
        {images.length === 0 && (
          <p className="detail__value --mb-40">{'-'}</p>
        )}
      </Grid>
    </Grid>
  </>
);
  
export default Summary;
  