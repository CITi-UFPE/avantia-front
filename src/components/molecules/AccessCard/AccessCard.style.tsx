import styled from 'styled-components';
import { flexcc, flex } from 'styles/variables';

export const AccessBackground = styled.div`
  ${flexcc}
  background-color: #231F20;
  height: 100%;
  width: 60%;
  padding: 5% 12%;
`;

export const TextContainer = styled.div`
  ${flex('flex-start', 'center', 'column', 'nowrap')}
  p, h1 {
    text-align: center;
  }
`;

export const AccessIcon = styled.img`
  width: 10px;
  margin: 0 5px;
`;
