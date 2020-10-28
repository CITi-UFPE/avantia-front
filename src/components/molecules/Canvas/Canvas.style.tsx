import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  width: 100%;
  object-fit: cover;
`;

export const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  z-index: 2;
`;
