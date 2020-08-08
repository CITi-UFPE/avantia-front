import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 80%;
  object-fit: cover;
  z-index: 2;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
