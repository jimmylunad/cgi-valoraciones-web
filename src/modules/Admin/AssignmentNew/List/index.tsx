/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@material-ui/core"
import { FormCheckbox, FormLabel } from "components/Form"
import { useCallback, useEffect, useState } from "react";
import { optionCSS } from "react-select/src/components/Option";
import { Option } from "types/assignment"

type ListOptions = {
  options: Option[],
  updateAddress: (values: {[value: string]: boolean}[]) => void
}

const List = ({
  options,
  updateAddress,
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
    if (options && options.length > 0 ) {
      const values = Object.keys(selecteds);
      const currentCheckeds: boolean = checkAll(values);   
      setAll(currentCheckeds);
    }
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
    setAll(false);
  }, [options]);

  useEffect(() => {

    let nextAddress: any = [];
    Object.keys(selecteds).forEach(value => {
      if (selecteds[value]) {
        nextAddress.push({
          id_address: value
        })
      }
    });
    updateAddress(nextAddress.length > 0 ? nextAddress : null);
  },[selecteds, updateAddress]);

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
