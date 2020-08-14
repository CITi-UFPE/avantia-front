import styled from 'styled-components';

import { flex, flexcc } from 'styles/variables';
import colors from 'styles/colors';

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

export const Footer = styled.footer`
  ${flex('center', 'center', 'row', 'nowrap')}

  width: 100%;
  min-height: 5rem;
  padding: 0 100px;

  border-top: 1px solid ${colors.secondaryBackground};
`;
