import React from "react"

export type RoutePage = {
  path: string;
  component: React.FC,
  protected?: boolean,
}

export enum ROLE {
  "supervisor" = 'supervisor',
  "operador" = 'operador',
}