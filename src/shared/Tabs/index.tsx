import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import './styles.scss';

export type TabOption = {
  title: string;
  link: string;
};

type TabsProps = {
  options: TabOption[]
};

const Tabs = ({ options }: TabsProps) => {
  
  const history = useHistory();
  const routeMatch = useRouteMatch();

  return (
    <Grid container className="tabs">
      {
        options.map(tabOption => (
          <Grid 
            item 
            xs={6} 
            className={
              "tabs__item " + 
              ( routeMatch.url.includes(tabOption.link)  ? '--active' : '')
            }
            onClick={() => {history.push(tabOption.link)}}
            >
            <span>{tabOption.title}</span>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Tabs;