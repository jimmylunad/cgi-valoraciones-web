import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";

type FooterProps = {
  title: string;
  icon: IconDefinition,
  onClick?: (event:any) => void,
  type?: string,
  loading?:boolean,
  disabled?:boolean
}

const Footer = ({ title, icon, type, loading, onClick, ...props}: FooterProps) => {
  return (
    <div className="actions">
      <Button
        className="btn --outline-info"
        type={type}
        onClick={onClick}
        {...props}
      >
         { 
          loading ? 
            <FontAwesomeIcon icon={faSpinner} spin size="2x" color="#205390"/> : 
            <>
              <span>{title}</span>{" "}
              <FontAwesomeIcon icon={icon} color="#205390" />
            </>
          }
      </Button>
    </div>
  )
};

export default Footer;
