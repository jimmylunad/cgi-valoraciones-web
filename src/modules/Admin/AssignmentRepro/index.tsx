import { faCalendar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, Grid } from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SingleDatePicker } from 'react-dates';
import Footer from "shared/Footer";
import Header from "shared/Header";
import moment from "moment";
import './styles.scss';
import { FormLabel } from "components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "services/useFetch";
import { useHistory, useParams } from "react-router";
import { Alert } from "@material-ui/lab";

moment.locale('es');

const AssignmentRepro = (): JSX.Element => {

  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [date, setDate] = useState<any>(moment())
  const [focused, setFocused] = useState<boolean>(false); 
  const [responseServer, setResponseServer] = useState<{
    severity: "success" | "error",
    message: string,
  } | null>(null);

  const { fetch , loading } = useFetch({
    config: {
      url: '/v1/app/supervisor/assignment/reschedule',
      method: 'POST',
    }
  })

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    const response = await fetch({
      data: {
        id_programming_address: params.id,
	      scheduled_date: date.format('YYYY-MM-DD')
      }
    })
    setResponseServer({
      severity: response.success ? 'success' : 'error',
      message: response.message
    });

    if (response.success) {
      setTimeout(() => {
        history.push('/');
      }, 4000);
    }
  }, []);

  return (
    <>
      <Header link="/" title="Programación" />
      <form onSubmit={onSubmit} >
        <div className="tab__wrapper">
          <Container maxWidth="md" className="tab__container">
            <div className="tab__list">
              <Grid container className="form" alignItems="center" justify="center">
                <Grid item xs={12} container direction="column">
                  <FormLabel>Fecha</FormLabel>
                  <SingleDatePicker 
                    date={date}
                    id="date"
                    onFocusChange={({ focused }) => { setFocused(focused)}}
                    numberOfMonths={1}
                    focused={focused}
                    onDateChange={(date) => setDate(date)}
                  />
                </Grid>
              </Grid>
            </div>
            {
              responseServer &&
                <>
                  <br></br>
                  {
                    <Alert severity={responseServer.severity}>
                        {responseServer.message}
                    </Alert>
                  }
                </>
              }
          </Container>
          <Footer
            type={"submit"} 
            title={"GUARDAR"} 
            icon={faCheckCircle} 
            loading={loading}
            onClick={(event:any) => {
              
            }}
          />
        </div>
      </form>
    </>
  )
};

export default AssignmentRepro;