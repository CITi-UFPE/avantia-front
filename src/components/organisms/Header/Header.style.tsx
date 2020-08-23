import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const Base = styled.header`
  ${flexcc}
  justify-content: space-around;

  width: 100%;
  height: 5rem;

  border-bottom: 1px solid ${colors.secondaryBackground};

  @media only screen and (max-width: 600px) {
    padding: .5rem 0;
  }
`;

export const WhatsappIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 10px;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

export const Text = styled.p`
  margin: 0;
  display: inline;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  ${flex('flex-start', 'center', 'unset', 'unset')}
  position: relative;
  img {
    height: 3rem;
    object-fit: cover;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 2.2rem;
  }
`;

export const BetaText = styled.p`
  color: #B2B2B2;
  border-radius: 18px;
  background-color: #B2B2B233;
  padding: 4px 8px;
  margin: 0;
  font-size: .6rem;

  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);

  @media only screen and (max-width: 600px) {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: max-content;
  }
`;
