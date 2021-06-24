import styled from 'styled-components';
import css from '@styled-system/css';
import { variant } from 'styled-system';
import { FormGroup as FormGroupGlobal } from '@material-ui/core';

export const FormInput = styled.input<any>`
  ${props => css({
    height: ['48px'],
    borderRadius: '8px',
    width: '100%',
    fontSize: ['14px'],
    padding: '0px 16px',
    border: `1px solid ${props.theme.colors.gray}`,
    transition: 'border 0.2s linear',
    background: '#f2f7f8',
    ":focus, :focus-visible": {
      background: '#e8f1fe',
      border: `1px solid ${props.theme.colors.primary}`,
      outline: 'none',
    },
  })}

  ${props => variant({
    prop: 'state',
    variants: {
      success: {
        borderColor: props.theme.colors.states.success,
      },
      error: {
        borderColor: props.theme.colors.states.error,
      },
    }
  })}
  border-radius: 8px;

  input[type="password" i] {
    letter-spacing: 8px;
  }

`;

export const FormLabel = styled.label`
  ${css({
    fontSize: ['14px', '16px'],
    color:  '#646363',
    mb: ['4px']
  })}

  ${props => variant({
    prop: 'state',
    variants: {
      error: {
        color: props.theme.colors.states.error,
      }
    }
  })}
`;

export const FormGroup = styled(FormGroupGlobal)`
  ${css({
    width: '100%',
    mb: ['16px']
  })}
`