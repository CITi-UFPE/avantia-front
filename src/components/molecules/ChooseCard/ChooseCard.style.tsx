import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const AccessBackground = styled.div`
  ${flexcc}
  background-color: #011027;
  width: 100%;
  border-radius: 5px;
  height: 100%;
  flex-grow: 1;
  padding: 10px 8%;

  @media only screen and (max-width: 700px) {
    border-radius: 0px;
    padding: 10px;
    height: 5rem;
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
  width: 7px;
  margin: ${({ button }: { button?: boolean }) => button && '0 5px'};
`;

export const AccessItemContainer = styled.ul`
  ${flex('flex-start', 'center', 'column', 'nowrap')}
  padding: 0;

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const AccessItem = styled.li`
  list-style: none;
  display: flex;
  align-items: flex-start;
  margin: .5rem 0;
  width: 90%;
  max-width: 60rem;
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
    font-size: 1rem;
  }
`;

export const AccessText = styled.p`
  color: white;
  margin: 0;
  text-align: left;
  width: calc(100% - 3.5rem);
  font-size: 13px;
`;

export const Image = styled.img`
  width: 20px;
  max-height: 20px;
  margin: 0 5px;
`;
