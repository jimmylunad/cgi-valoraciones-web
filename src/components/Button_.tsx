import styled from 'styled-components';
import css from '@styled-system/css';
import { variant, width } from 'styled-system';

export const Button = styled.button<{ variant: string, width?: string }>`
  ${css({
    height: ['48px'],
    width: ["100%"],
    borderRadius: '8px',
    outline: "0",
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s linear',
    ':hover': {
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    },
  })}

  ${props => variant({
    variants: {
      primary: {
        background: props.theme.colors.primary,
        color: 'white',
        ':active': {
          background: '#02a751',
        }
      },
      cancel: {
        background: "#ffe2e5",
        color: "#f64e60",
        ':active': {
          background: '#f7929d',
        }
      },
    }
  })}

  ${width}
`;