export type RoutePage = {
  path: string;
  component: React.FC,
  protected?: boolean,
}

export type RoutePageRole = {
  [name: string]: RoutePage[],
}

export enum ROLE {
  "supervisor" = 'supervisor',
  "operator" = 'operator',
}

export type ProvideProps = {
  children: JSX.Element,
  getInitialProps: () => any
}

export type ActionsProps<T> = {
  type: string;
  payload: T;
}
