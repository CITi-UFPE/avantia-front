import styled from 'styled-components';

import colors from 'styles/colors';

export const Anchor = styled.a`
  border: 2px solid ${colors.orange};
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  transition: opacity .1s ease-in-out;
  opacity: 1;

  &:focus, &:hover {
    opacity: 0.7;
  }
`;
