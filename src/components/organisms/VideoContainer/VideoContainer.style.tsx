import styled from 'styled-components';

import { flexcc } from 'styles/variables';

export const Container = styled.div`
  ${flexcc}
  height: 100%;
  position: relative;
  max-width: 100%;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
