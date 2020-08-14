import styled, { css } from 'styled-components';

import colors from 'styles/colors';

export const Anchor = styled.a`
  ${({ noBorder, type }: { noBorder?: boolean, type?: 'primary' | 'default' }) => !noBorder && css`
    border: 1px solid ${type === 'primary' ? colors.white : colors.orange};
    border-radius: 5px;
  `}
  padding: 5px 10px;
  margin: 5px 0;
  transition: opacity .2s ease-in-out;
  opacity: 1;
  text-transform: uppercase;
  background-color: ${({ type }) => type === 'primary' && colors.orange};
  color: ${({ type }) => type === 'primary' && colors.white};

  &:focus, &:hover {
    opacity: 0.7;
  }
`;
