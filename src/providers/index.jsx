import AuthProvider from './Auth/provider';

const CONTEXTS = [
  AuthProvider,
];

const Providers = (props) => {
  const { children, ...rest } = props;

  return CONTEXTS.reduceRight(
    (acc, Comp) => <Comp {...rest}>{acc}</Comp>,
    children,
  );
};

export default Providers;
