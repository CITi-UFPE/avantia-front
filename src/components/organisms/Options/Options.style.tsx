import styled, { css } from 'styled-components';
import colors from 'styles/colors';
import { flex } from 'styles/variables';

export const Card = styled.div`
  border: 1px solid #cccccc;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px;
  color: black;
  font-size: .6rem;

  .ant-checkbox-wrapper {
    color: black !important;
    font-size: .6rem !important;
  }
  .ant-checkbox-wrapper-checked .ant-checkbox-inner {
    background-color: ${colors.lightBlue};
    border-color: ${colors.lightBlue};
  }
  .ant-checkbox::after {
    border: 1px solid ${colors.lightBlue};
  }
`;

export const Title = styled.h3`
  text-transform: uppercase;
  color: black;
  font-size: .8rem;
`;

export const Label = styled.h3`
  text-transform: uppercase;
  color: #474747;
  font-size: .7rem;
  margin: 10px 0;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

export const Button = styled.button<{ clean?: boolean, save?: boolean }>`
  border: none;
  outline: none;
  padding: 5px 20px;
  color: black;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: .7rem;
  cursor: pointer;

  ${({ clean }) => clean && css`
    background-color: #DADADA;
    color: #707070;
  `}

  ${({ save }) => save && css`
    background-color: ${colors.lightBlue};
    color: white;
  `}
`;

export const Input = styled.input`
  text-align: center;
  background-color: ${colors.lightGray};
  border: none;
  width: 4rem;
  font-size: .7rem;
  margin: 0 5px 0 0;
  outline: none;
  border-bottom: 2px solid ${colors.secondaryGray};
`;

export const Select = styled.button`
  ${flex('space-around', 'center', 'row', 'nowrap')}
  border: 1px solid ${colors.secondaryGray};
  border-radius: 5px;
  width: 50px;
  padding: 5px 5px;
  cursor: pointer;
  outline: none;
`;

export const Color = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ color }: { color: string }) => color};
`;

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

export const Shadow = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
