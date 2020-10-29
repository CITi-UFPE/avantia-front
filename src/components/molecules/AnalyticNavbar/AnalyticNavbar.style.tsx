import styled, { css } from 'styled-components';
import { flex } from 'styles/variables';

export const Container = styled.ul`
  ${flex('center', 'center', 'column', 'nowrap')}
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

  ${({ disabled }) => (disabled ? css`
    opacity: 0.5;
    cursor: not-allowed;
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
