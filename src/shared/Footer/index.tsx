import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";

type FooterProps = {
  title: string;
  icon: IconDefinition,
  onClick: () => void,
  loading:boolean
}

const Footer = ({ title, icon, loading, onClick }: FooterProps) => {
  return (
    <div className="actions">
      <Button
        className="btn --outline-info"
        onClick={onClick}
      >
        <span>{title}</span>{" "}
        <FontAwesomeIcon icon={icon} color="#205390" />
      </Button>
    </div>
  )
};

export default Footer;
