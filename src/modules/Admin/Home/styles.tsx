import { 
  Grid as GridGlobal, 
  GridProps, 
  Typography as TypographyGlobal, 
} from '@material-ui/core';
import css from '@styled-system/css';
import styled from 'styled-components';
import { variant } from 'styled-system';

export const Header = styled.nav`
  ${css({
    width: '100%',
    background: 'white',
    height: '40px',
  })}
`;

export const Menu = styled.ul`
  ${css({
    listStyle: 'none',
  })}
`;

export const MenuItem = styled.li`
  ${css({
    mb: ['16px']
  })}
`;

export const Grid = styled(GridGlobal)<GridProps & { bg?: string, styles?: string }>`
  ${props => variant({
    prop: 'styles',
    variants: {
      menuItem: {
        marginRight: '16px !important',
        borderRadius: '8px',
        background: props.bg,
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
  })}
`; 

export const Typography = styled(TypographyGlobal)< any & {styles: string}>`
  ${variant({
    prop: 'styles',
    variants: {
      menuTitle: {
        fontSize: '14px'
      },
      menuSubTitle: {
        fontSize: '12px',
      }
    }
  })}
`