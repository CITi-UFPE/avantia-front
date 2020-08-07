import styled from 'styled-components';

import colors from 'styles/colors';

import { ReactComponent as WhatsappSvg } from 'assets/icons/whatsapp.svg';

export const InfoButton = styled.button`
  border-left: 1px solid ${colors.secondaryBackground};
  border-bottom: 1px solid ${colors.secondaryBackground};
  border-top: 0;
  border-right: 0;
  border-bottom-left-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  margin: 0;
  background-color: white;
  padding: 0;
  outline: none;
  cursor: pointer;
`;

export const InfoIcon = styled.img`
  width: 20px;
  margin: 5px;
`;

export const WhatsappIcon = styled(WhatsappSvg)`
  height: 80%;
  path {
    fill: white;
  }
`;
