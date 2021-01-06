import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';

import { useMobile } from 'hooks';

import trashIcon from 'assets/icons/trash.svg';

import {
  Card,
  Title,
  Description,
  Section,
  Label,
  TrashButton,
  TrashIcon,
  ButtonContainer,
  Button,
  Input,
  ColorsContainer,
  ColorBall,
  PlusIcon,
  ModalContainer,
  Shadow,
  DropdownOpen,
  DropdownClose,
} from './Options.style';

const defaultConfig: OptionsConfig = {
  notify: ['mask', 'person'],
  quantity: 1,
  color: '#4BBFD1',
  time: 2,
  default: true,
};

type OptionsProps = {
  notify?: { value: string, label: string }[],
  showQuantity?: boolean,
  showColorPicker?: boolean,
  showTime?: boolean,
  onChange: (changeObj: typeof defaultConfig) => void,
  mobileHeight?: string,
  analyticName?: string,
};

function Options({
  notify,
  onChange,
  showQuantity = false,
  showColorPicker = false,
  showTime = false,
  mobileHeight = '10rem',
  analyticName = '',
}: OptionsProps) {
  const [changeObj, setChangeObj] = useState(defaultConfig);
  const [tempObj, setTempObj] = useState(defaultConfig);
  const [showColor, setShowColor] = useState(false);
  const [colors, setColors] = useState(['#61CA55', '#7BAFFA', '#C73C2C', '#F27D39']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = useMobile(700);

  const generateHandler = (key: string, both: boolean = false) => (value: any) => {
    setTempObj((prevObj) => ({
      ...prevObj,
      default: false,
      [key]: value,
    }));
    if (both) {
      setChangeObj((prevObj) => ({
        ...prevObj,
        default: false,
        [key]: value,
      }));
    }
  };

  useEffect(() => {
    onChange({ ...changeObj });
  }, [changeObj, onChange]);

  return (
    <>
      {isMobile && (
        <DropdownOpen onClick={() => setDropdownOpen(true)}>
          <UpOutlined style={{ color: '#3f3f3f' }} />
        </DropdownOpen>
      )}
      <Card mobileHeight={mobileHeight} mobileShow={dropdownOpen}>
        {isMobile && (
          <DropdownClose onClick={() => setDropdownOpen(false)}>
            <DownOutlined style={{ color: '#3f3f3f' }} />
          </DropdownClose>
        )}
        <Title>Configurar Analítico</Title>
        <Description>{analyticName}</Description>
        {showColorPicker && (
          <Section>
            <Label>Marcar Área de Detecção</Label>
            <ColorsContainer>
              {colors.map((color) => (
                <ColorBall active={color === tempObj.color} color={`${color}`} onClick={() => generateHandler('color', true)(`${color}`)} />
              ))}
              <ColorBall
                color="transparent"
                border
                onClick={() => setShowColor((prevShow) => !prevShow)}
              >
                <PlusIcon />
              </ColorBall>
              <TrashButton
                onClick={() => generateHandler('default', true)(true)}
              >
                <TrashIcon src={trashIcon} />
              </TrashButton>
            </ColorsContainer>
            {showColor && (
              <ModalContainer>
                <Shadow onClick={() => setShowColor(false)} />
                <ChromePicker
                  color={tempObj.color}
                  onChangeComplete={({ hex }) => {
                    generateHandler('color', true)(hex);
                    setColors((prevColors) => [...prevColors, hex]);
                  }}
                />
              </ModalContainer>
            )}
          </Section>
        )}
        {notify && (
          <Section>
            <Label>Notificar Apenas</Label>
            <Checkbox.Group
              options={notify}
              defaultValue={defaultConfig.notify}
              value={tempObj.notify}
              onChange={generateHandler('notify')}
            />
          </Section>
        )}
        {showQuantity && (
          <Section>
            <Label>Notificar a partir de</Label>
            <Input
              value={tempObj.quantity}
              onChange={(e) => generateHandler('quantity')(Number(e.target.value))}
              type="number"
              min="0"
              placeholder="Ex: 30"
            />
            elementos
          </Section>
        )}
        {showTime && (
          <Section>
            <Label>Notificar a partir de</Label>
            <Input
              value={tempObj.time}
              onChange={(e) => generateHandler('time')(Number(e.target.value))}
              type="number"
              min="0"
              placeholder="Ex: 30"
            />
            segundos
          </Section>
        )}
        <ButtonContainer>
          <Button
            onClick={() => {
              setChangeObj({ ...defaultConfig });
              setTempObj({ ...defaultConfig });
            }}
            clean
          >
            Limpar
          </Button>
          <Button save onClick={() => setChangeObj(tempObj)}>Aplicar</Button>
        </ButtonContainer>
      </Card>
    </>
  );
}

export type OptionsConfig = {
  notify: ('mask' | 'nomask' | 'person' | 'car' | 'truck' | 'bus')[],
  quantity: number,
  time: number,
  color: string,
  default: boolean,
}

export default Options;
