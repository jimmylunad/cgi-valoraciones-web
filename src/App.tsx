import React from 'react';
import { 
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import routes from 'modules';
import { ThemeProvider as ThemeProviderMui } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import RouterOutlet from 'shared/RouteOutlet';
import { themeGlobal, themeMui } from 'styles/theme';
import 'styles/base/normalize.css';
import 'styles/base/reset.css';
import 'styles/base/fonts.css';
import 'styles/base/_utils.scss';

function App() {
  return (
    <ThemeProvider theme={themeGlobal}>
      <ThemeProviderMui theme={{...themeMui}}>
          <Router>
            <Switch>
              {
                routes.map((route) => (
                  <RouterOutlet key={route.path} {...route} />
                ))
              }
            </Switch>
          </Router>
      </ThemeProviderMui>
    </ThemeProvider>
  );
}

export default App;
