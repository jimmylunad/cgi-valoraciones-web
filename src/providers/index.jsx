import AuthProvider from './Auth/provider';
import DBProvider from './DB/provider';

const CONTEXTS = [
  AuthProvider,
  DBProvider,
];

const Providers = (props) => {
  const { children, ...rest } = props;

  return CONTEXTS.reduceRight(
    (acc, Comp) => <Comp {...rest}>{acc}</Comp>,
    children,
  );
};

export default Providers;
