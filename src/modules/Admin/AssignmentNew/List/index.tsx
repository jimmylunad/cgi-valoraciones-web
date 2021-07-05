/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@material-ui/core"
import { FormCheckbox, FormLabel } from "components/Form"
import { useCallback, useEffect, useState } from "react";
import { Option } from "types/assignment"

type ListOptions = {
  options: Option[],
  prefixName: number;
}

const List = ({
  options,
  prefixName,
}: ListOptions) => {

  const [selecteds, setSelecteds] = useState<{[value: string]: boolean}>({}); 
  const [all, setAll] = useState<boolean>(false);

  const checkAll = useCallback((values: any[]) => {
    for(var i in values) {
      if(!selecteds[values[i]]) {
        return false;
      }
    }
    return true;
  }, [selecteds])

  const handleChange = (event: any) => {
    let prevSelecteds = {...selecteds };
    setSelecteds({
      ...prevSelecteds,
      [event.target.name]: event.target.checked,
    })
  }
  

  useEffect(() => {
    const values = Object.keys(selecteds);
    const currentCheckeds: boolean = checkAll(values);   
    setAll(currentCheckeds);
  }, [checkAll, selecteds])

  const handleAllChange = () => {

    const values = Object.keys(selecteds);
    const currentCheckeds: boolean = checkAll(values);   
    const nextAll = options.length === values.length ? !currentCheckeds : currentCheckeds;  
    setAll(nextAll);

    const nextSelecteds: any = {};
    options.forEach(option =>  {
      nextSelecteds[option.value] = nextAll;
    })
    setSelecteds(nextSelecteds);
  }

  useEffect(() => {
    setSelecteds({})
  }, [options]);

  return (
    <>
      <FormLabel>
        Dirección
      </FormLabel>
      <ul className="list-options">
        <li>
          <Grid container>
            <Grid className="form-grid-checkbox" xs={1} container item  justify="center" alignItems="center">
                <FormCheckbox checked={all} onChange={handleAllChange}>{""}</FormCheckbox>
              </Grid>
              <Grid className="form-grid-item --center" xs={11} container item alignItems="center">
                Descripción
              </Grid>
          </Grid>
        </li>
        {options && options.map((option, index) => (
          <li>
            <Grid container>
              <Grid className="form-grid-checkbox" xs={1} container item  justify="center" alignItems="center">
                <FormCheckbox 
                  onChange={handleChange} 
                  checked={Boolean(selecteds[option.value])}
                  name={String(option.value)}>{""}
                </FormCheckbox>
              </Grid>
              <Grid className="form-grid-item" xs={11} container item alignItems="center">
                {option.option}
              </Grid>
            </Grid>
          </li>
        ))}
      </ul>
    </>
  )
};

export default List;
