import styled, { css } from 'styled-components';
import { Switch as AntSwitch, Progress } from 'antd';

import colors from 'styles/colors';
import { flexcc } from 'styles/variables';

export const ControlsContainer = styled.div`
  ${flexcc}

  @media only screen and (max-width: 600px) {
    justify-content: space-around;
  }
`;

export const SwitchIcon = styled.img`
  width: 15px;
`;

export const Switch = styled(AntSwitch)`
  background-color: ${colors.orange};
  height: 30px;
  width: 60px;
  margin: 0 10px;
  &.ant-switch-disabled {
    background-color: ${colors.gray};
    opacity: 0.8;
  }
  .ant-switch-handle {
    height: 26px;
    width: 26px;
    &::before {
      border-radius: 50px;
    }
  }
  .ant-switch-inner {
    margin: 0 7px 0 35px;
  }
  &.ant-switch-checked {
    .ant-switch-handle {
      left: calc(100% - 26px - 2px);
    }
    .ant-switch-inner {
      margin: 0 35px 0 7px;
    }
  }
`;

export const ButtonContainer = styled(Progress)`
  ${flexcc}
  transition: all .2s ease-in-out;

  ${({ isRecording }: { disabled: boolean, isRecording: boolean }) => (isRecording && css`
    transform: scale(1.4);
  `)}
  margin: 0 10px;

  ${({ disabled }) => disabled && css`
    opacity: 0.8;
    button {
      cursor: not-allowed;
      background-color: ${colors.gray};
    }
  `}
`;

type ButtonProps = {
  mode: 'camera' | 'video';
};

export const Button = styled.button`
  background-color: ${({ mode }: ButtonProps) => (mode === 'camera' ? colors.orange : colors.red)};
  transition: all .2s ease-in-out;
  border-radius: 50px;
  border: none;
  outline: none;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;
