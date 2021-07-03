import React from 'react';
import { 
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import routes from 'modules';
import { ThemeProvider as ThemeProviderMui } from '@material-ui/core/styles';
import RouterOutlet from 'shared/RouteOutlet';
import { themeMui } from 'styles/theme';
import Providers from 'providers';
import 'styles/base/normalize.css';
import 'styles/base/reset.css';
import 'styles/base/fonts.css';
import 'styles/base/_utils.scss';

function App() {
  return (
    <Providers>
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
    </Providers>
  );
}

export default App;
