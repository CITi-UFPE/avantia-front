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
    height: 70%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const InfoText = styled.p`
  opacity: 0.7;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  color: black;
  background-color: white;
  width: 80%;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: .8rem;

  @media only screen and (max-width: 600px) {
    font-size: .6rem;
  }
`;
