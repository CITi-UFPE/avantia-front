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

export const Warn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: .6rem;
  margin-bottom: 5px;
  padding: 3px 8px;
  background-color: #D50915C9;
  border-radius: 5px;
  width: max-content;
`;
