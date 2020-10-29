import styled from 'styled-components';

import { flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const AccessCounterContainer = styled.div`
  ${flexcc}
  background-color: ${colors.blue};
  height: 30px;
  min-width: 60px;
  padding: 0 5px;
  margin: 0 5px;
  font-size: 1.4rem;
  font-weight: bolder;
`;

export const Base = styled.footer`
  ${flexcc}

  width: 100%;
  min-height: 5rem;

  border-top: 1px solid ${colors.secondaryBackground};

  p {
    width: max-content;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;

    p {
      font-size: .6rem;
    }
  }
`;
