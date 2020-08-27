import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const Base = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  width: 100%;
  height: 5rem;

  border-bottom: 1px solid ${colors.secondaryBackground};

  @media only screen and (max-width: 750px) {
    padding: .5rem 0;

    div > img {
      width: 6rem;
    }
  }
`;

export const NavItem = styled.div`
  ${flexcc}
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
`;

export const BetaText = styled.p`
  color: #B2B2B2;
  border-radius: 18px;
  background-color: #B2B2B233;
  padding: 4px 8px;
  margin: 0;
  font-size: .6rem;
  width: 80px;
  text-align: center;

  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);

  @media only screen and (max-width: 750px) {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 70%);
    width: max-content;
  }
`;
