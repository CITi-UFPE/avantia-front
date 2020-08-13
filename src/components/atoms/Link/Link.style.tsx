import styled, { css } from 'styled-components';

import colors from 'styles/colors';

export const Anchor = styled.a`
  ${({ noBorder }: { noBorder?: boolean }) => !noBorder && css`
    border: 1px solid ${colors.orange};
    border-radius: 5px;
  `}
  padding: 5px 10px;
  margin: 5px 0;
  transition: opacity .2s ease-in-out;
  opacity: 1;
  text-transform: uppercase;

  &:focus, &:hover {
    opacity: 0.7;
  }
`;
