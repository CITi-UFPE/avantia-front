import styled from 'styled-components';

import { flexcc } from 'styles/variables';

import { ReactComponent as WhatsappSvg } from 'assets/icons/whatsapp.svg';

export const Base = styled.header`
  ${flexcc}
  justify-content: space-around;

  width: 100%;
  height: 5rem;

  border-bottom: 1px solid #B2B2B2;
`;

export const WhatsappIcon = styled(WhatsappSvg)`
  height: 80%;
  path {
    fill: white;
  }
`;
