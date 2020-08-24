import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const AccessBackground = styled.div`
  ${flexcc}
  background-color: #231F20;
  height: 100%;
  width: 60%;
  padding: 5% 8%;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 80%;
  }
`;

export const TextContainer = styled.div`
  ${flex('flex-start', 'center', 'column', 'nowrap')}
  h1 {
    text-align: center;
  }

  @media only screen and (max-width: 800px) {
    h1 {
      font-size: 1rem;
    }
    button {
      padding: 5px 10px;
      font-size: .8rem;
    }
  }
`;

export const AccessIcon = styled.img`
  width: 10px;
  margin: ${({ button }: { button?: boolean }) => button && '0 5px'};
`;

export const AccessItemContainer = styled.ul`
  padding: 0;

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const AccessItem = styled.li`
  list-style: none;
  display: flex;
  margin: 1.5rem 0;

  @media only screen and (max-width: 800px) {
    margin: .6rem 0;
  }
`;

export const AccessNumber = styled.div`
  margin: 0 1rem 0 0;
  border-radius: 50%;
  border: 1px solid ${colors.orange};
  color: ${colors.orange};
  ${flexcc}
  font-weight: bold;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;

  @media only screen and (max-width: 800px) {
    width: 2rem;
    height: 2rem;
    font-size: .8rem;
  }
`;

export const AccessText = styled.p`
  color: white;
  margin: 0;
  text-align: left;
  width: calc(100% - 3.5rem);
  font-size: .7rem;

  @media only screen and (max-width: 800px) {
    font-size: .6rem;
  }
`;

export const BottomText = styled.p`
  margin: 2rem 0 0 0;
  color: white;
  font-size: .7rem;

  @media only screen and (max-width: 800px) {
    margin-top: .5rem;
    font-size: .6rem;
  }
`;
