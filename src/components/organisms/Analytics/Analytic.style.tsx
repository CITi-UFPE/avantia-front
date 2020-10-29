import styled from 'styled-components';

import { flexcc } from 'styles/variables';

export const Container = styled.div`
  ${flexcc}
  position: relative;
  width: 100%;
  /* height: calc(80vh - 140px); */
  max-height: 90%;
  overflow: hidden;
`;
