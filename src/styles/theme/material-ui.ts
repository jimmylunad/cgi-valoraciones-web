import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

breakpoints.values.xs = 320; 
breakpoints.values.sm = 360; 
breakpoints.values.md = 780; 

const themeMaterial = createMuiTheme({
  breakpoints,
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: '\'Flexo-regular\', sans-serif',
      },
      body1: {
        fontFamily: '\'Flexo-regular\', sans-serif',
      }
    }
  }
});

export default themeMaterial;
