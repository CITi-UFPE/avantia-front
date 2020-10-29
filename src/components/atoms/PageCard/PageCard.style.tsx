import styled from 'styled-components';

import colors from 'styles/colors';

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  flex-flow: column;
  background-color: ${colors.lightGray};
  height: 95%;
  width: 80%;
  padding: 10px;
  border-radius: 10px;
`;

export const Title = styled.h3`
  color: ${colors.blue};
  text-transform: uppercase;
`;

export const Dash = styled.div`
  width: 150px;
  height: 2px;
  margin: 5px 0;
  background-color: ${colors.orange};
`;
