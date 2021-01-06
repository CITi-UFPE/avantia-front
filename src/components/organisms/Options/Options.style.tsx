import styled, { css } from 'styled-components';
import colors from 'styles/colors';
import { PlusOutlined } from '@ant-design/icons';

export const Card = styled.div`
  border: 1px solid #cccccc;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px 0px;
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

  @media only screen and (max-width: 700px) {
    width: 100%;
    position: absolute;
    z-index: 5;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    bottom: 0;
    overflow: hidden;
    height: ${({ mobileHeight }: { mobileHeight: string, mobileShow: boolean }) => mobileHeight || '10rem'};
    max-height: 0;
    padding: 0 15px;
    transition: max-height .8s ease-in-out, padding .4s linear, border .4s linear;
    border: 0px solid white;

    ${({ mobileShow }) => mobileShow && css`
      max-height: ${({ mobileHeight }: { mobileHeight: string, mobileShow: boolean }) => mobileHeight || '10rem'};
      padding: 10px 15px 0px;
      border: 1px solid #cccccc;
    `}
  }
`;

export const Title = styled.h3`
  text-transform: uppercase;
  color: black;
  font-size: .8rem;
  margin: 0;
`;

export const Description = styled.h3`
  text-transform: uppercase;
  color: #707070;
  font-size: .5rem;
`;

export const Section = styled.div`
  padding: 10px;
  background-color: #EFEFEF;
  margin-bottom: 8px;
  border-radius: 5px;
`;

export const Label = styled.h3`
  color: #707070;
  font-size: .7rem;
  margin: 0 0 6px 0;
`;

export const TrashButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const TrashIcon = styled.img`
  height: 23px;
  margin: 1px 10px;
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

export const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ColorBall = styled.button`
  width: 15px;
  height: 15px;
  background-color: ${({ color }: { color: string, border?: boolean, active?: boolean }) => color || 'white'};
  border-radius: 50px;
  outline: none;
  margin: 5px;
  padding: 0;
  border: ${({ border }) => (border ? '1px solid #B2B2B2' : 'none')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ active }) => (active && css`
    border: 1px solid black;
  `)}
`;

export const PlusIcon = styled(PlusOutlined)`
  color: #B2B2B2;
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

export const DropdownOpen = styled.button`
  height: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border: none;
  outline: none;

  @media only screen and (max-width: 450px) {
    position: absolute;
    bottom: 0;
  }
`;

export const DropdownClose = styled.button`
  width: 100%;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border: none;
  outline: none;
`;
