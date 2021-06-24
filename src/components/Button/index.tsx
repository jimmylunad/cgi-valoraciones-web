import './styles.scss';

type Props = {
  className: string;
  children: JSX.Element | string,
};

const Button = ({ children, ...props }: Props & any) => 
  <button {...props}>
    {children}
  </button> 

Button.defaultProps = {
  className: 'btn'
}


export default Button;