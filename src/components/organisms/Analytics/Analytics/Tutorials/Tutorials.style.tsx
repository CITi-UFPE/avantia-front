import styled from 'styled-components';

export const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(44, 57, 75, 0.432);
  cursor: pointer;

  img {
    width: 20%;
  }
  p {
    width: 60%;
    font-size: .7rem;
    span {
      display: inline;
      font-weight: bold;
    }
  }
`;
