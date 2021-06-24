import "./styles.scss";


export const FormInput = (props: any) => <input {...props}/>;

FormInput.defaultProps = {
  className: 'form-input'
}



type FormCheckboxProps = {
  children: string,
}

export const FormCheckbox = ({children, ...props }:FormCheckboxProps) => (
  <label className="form-checkbox">
    <input className="form-checkbox__input" type="checkbox" {...props}></input>
    <span className="form-checkbok__label">
      {children}
    </span>
  </label>
)