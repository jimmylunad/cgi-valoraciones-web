import { Container, Grid } from "@material-ui/core";
import { FormCheckbox } from "components/Form";
import Header from "shared/Header";
import "./styles.scss";

const AssignmentNew = (): JSX.Element => {
  const OPTIONS = [{},{}, {}];

  return (
    <>
      <Header link="/" title="Nueva programación" />
      <Container maxWidth="md" className="tab__container">
        <Grid container className="form" alignItems="center" justify="center">
          <Grid item xs={12}>
          <br></br>
          <br></br>
          <br></br>
            <ul className="list-options">
              {OPTIONS.map((option, index) => (
                <li>
                  <Grid container>
                    <Grid className="form-grid-checkbox" xs={1} container item  justify="center" alignItems="center">
                      <FormCheckbox>{""}</FormCheckbox>
                    </Grid>
                    <Grid className="form-grid-item" xs={11} container item alignItems="center">
                      {
                        index === 0 ? <span>Descripción</span>: "Item value"
                      }
                    </Grid>
                  </Grid>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </>
  )
};

export default AssignmentNew;