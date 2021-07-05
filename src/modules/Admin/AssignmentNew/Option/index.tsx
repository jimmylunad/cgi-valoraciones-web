import { Grid } from "@material-ui/core";
import { FormSelect, FormLabel } from "components/Form";
import { Controller } from "react-hook-form";

type OptionProps = {
  label: string;
  control: any;
  errors: any;
  options: any;
  name: string;
}

const Option = ({
  label,
  control,
  errors,
  options,
  name,
}: OptionProps) => {
  return (
    <Grid item xs={12}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Please select an option'}}
        render={({ field }) => 
        <FormSelect
          {...field} 
          isDisabled={!options}
          placeholder="Seleccionar"
          className={"form-select " + (errors[name] ? '--error' : '')} 
          options={ options ? options.map((e:any) => ({value: e.value, label: e.option })): []} 
        />}
      />
    </Grid>
  )
}

export default Option;