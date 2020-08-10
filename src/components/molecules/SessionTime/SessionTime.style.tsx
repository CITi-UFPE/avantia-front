import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const Container = styled.div`
  ${flexcc}
  flex-direction: column;
  ${({ disabled }: { disabled: boolean }) => (disabled && css`
    p, h1 {
      color: ${colors.gray};
    }
  `)}

  @media only screen and (max-width: 600px) {
    p {
      font-size: .6rem;
      width: 50px;
      text-align: center;
    }
    h1 { font-size: .8rem; }
  }
`;
