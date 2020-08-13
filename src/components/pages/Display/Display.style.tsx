import styled from 'styled-components';
import { flexcc } from 'styles/variables';

export const Container = styled.div`
  ${flexcc}
  height: 100%;
  width: 100%;
`;

export const Image = styled.img`
  width: 50%;
  height: 100%;
  object-fit: contain;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
