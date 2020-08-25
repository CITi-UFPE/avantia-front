import styled, { css } from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const InfoIcon = styled.img`
  width: 20px;
  margin: 0 5px;
`;

export const InfoContainer = styled.div`
  ${flex('center', 'center', 'column', 'nowrap')}
  ${({ disabled }: { disabled: boolean }) => (disabled && css`
    p, h1 {
      color: ${colors.gray};
      opacity: 0.8;
    }
  `)}
`;

export const ButtonContainer = styled.button`
  ${flexcc}
  background-color: transparent;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
`;

export const ConnectionContainer = styled.div`
  ${flexcc}
`;

export const ConnectionIcon = styled.img`
  width: 20px;
  margin: 0 5px;

  @media only screen and (max-width: 600px) {
    width: 30px;
    margin: 0;
  }
`;

export const Highlight = styled.span`
  text-transform: uppercase;
  color: ${colors.success};
  font-weight: bold;
`;
