import React from "react";
import Select from 'react-select';
import "./styles.scss";


export const FormInput = React.forwardRef((props: any, ref) => <input ref={ref} {...props}/>);

FormInput.defaultProps = {
  className: 'form-input'
}

type FormCheckboxProps = {
  children: string,
  name?: string;
  id?:string;
  checked?: boolean;
  onChange?: (event:any) => void
}

export const FormCheckbox = ({children, ...props }:FormCheckboxProps) => (
  <label className="form-checkbox">
    <input className="form-checkbox__input" type="checkbox" {...props}></input>
    <span className="form-checkbok__label">
      {children}
    </span>
  </label>
);

type FormLabelProps = {
  children?: string;
  className?: string;
}


export const FormLabel = ({children, className, ...props}: FormLabelProps) => <label className={"form-label " + className} {...props} >{children}</label>

export const FormSelect =  React.forwardRef((props: any, ref) => (<Select isSearchable={false} ref={ref} {...props} />)); 

export const FormTextarea = React.forwardRef((props: any, ref) =>  <textarea className="form-textarea" ref={ref} {...props}></textarea>);