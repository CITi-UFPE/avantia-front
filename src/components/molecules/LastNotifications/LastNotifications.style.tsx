import styled, { css } from 'styled-components';

export const Base = styled.div`
  border: 1px solid #cccccc;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px 0;
  color: black;
  cursor: pointer;
`;

export const Title = styled.h3`
  text-transform: uppercase;
  color: black;
  font-size: .8rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalImageContainer = styled(ImageContainer)`
  margin: 10px 0;
`;

export const Placeholder = styled.div`
  background-color: #C1C1C1;
  width: 15%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const ModalPlaceholder = styled(Placeholder)`
  border-radius: 10px;
  cursor: not-allowed;
`;

export const Image = styled.img`
  width: 15%;
  object-fit: cover;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const ModalImage = styled(Image)`
  border-radius: 10px;
  cursor: pointer;
`;

export const ModalBigImage = styled.img`
  width: 100%;
  object-fit: contain;
`;
