import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { flex } from 'styles/variables';

export const Container = styled.ul`
  ${flex('center', 'center', 'column', 'nowrap')}

  ${({ mobile }: { mobile: boolean }) => (mobile ? css`
    @media only screen and (min-width: 700px) {
      display: none;
    }
  ` : css`
    @media only screen and (max-width: 700px) {
      display: none;
    }
  `)}

  @media only screen and (max-width: 700px) {
    ${flex('space-between', 'center', 'row', 'nowrap')}
    padding: 0;
    width: 100%;
    min-height: 120px;
    margin: 0;
    overflow-x: auto;
  }
`;

const cardMobile = css`
  @media only screen and (max-width: 700px) {
    height: 80%;
    width: 20%;
    min-width: 5rem;
    margin: 0 10px;
  }
`;

export const Card = styled.li<{ disabled?: Boolean }>`
  ${flex('flex-start', 'center', 'row', 'nowrap')}
  list-style: none;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 1px 5px 2px #c7c7c7;
  margin: 10px 0;
  padding: 10px 15px;
  transition: box-shadow .5s ease-in-out, background-color .5s ease-in-out;

  img {
    filter: invert(49%) sepia(20%) saturate(1093%) hue-rotate(176deg) brightness(90%) contrast(90%);
    transition: filter .5s ease-in-out;
  }

  p {
    transition: color .5s ease-in-out;
  }

  @media only screen and (max-width: 700px) {
    ${flex('center', 'center', 'column', 'nowrap')}
    height: 100%;
    padding: 0 15px;
    margin: 0;

    p {
      font-size: .6rem;
      text-transform: capitalize !important;
      text-align: center;
    }
  }

  ${({ disabled }) => (disabled ? css`
    opacity: 0.5;
    cursor: not-allowed;

    ${cardMobile}
  ` : css`
    &:hover {
      cursor: pointer;
      box-shadow: 0px 5px 7px 2px #c7c7c7;
      background-color: #557cb5;

      img {
        filter: invert(100%) sepia(0%) saturate(7463%) hue-rotate(200deg) brightness(107%) contrast(94%);
      }

      p {
        color: white !important;
      }
    }
  `)}
`;

export const CustomLink = styled(Link)`
  width: 100%;

  ${cardMobile}
`;
