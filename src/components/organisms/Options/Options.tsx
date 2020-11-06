import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';

import { useMobile } from 'hooks';

import {
  Card,
  Title,
  Label,
  ButtonContainer,
  Button,
  Input,
  Select,
  Color,
  ModalContainer,
  Shadow,
  DropdownOpen,
  DropdownClose,
} from './Options.style';

const defaultConfig: OptionsConfig = {
  notify: ['mask', 'person'],
  quantity: 10,
  color: '#4BBFD1',
  time: 10,
};

type OptionsProps = {
  notify?: { value: string, label: string }[],
  showQuantity?: boolean,
  showColorPicker?: boolean,
  showTime?: boolean,
  onChange: (changeObj: typeof defaultConfig) => void,
  mobileHeight?: string,
};

function Options({
  notify,
  onChange,
  showQuantity = false,
  showColorPicker = false,
  showTime = false,
  mobileHeight = '10rem',
}: OptionsProps) {
  const [changeObj, setChangeObj] = useState(defaultConfig);
  const [showColor, setShowColor] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = useMobile(700);

  const generateHandler = (key: string) => (value: any) => {
    setChangeObj((prevObj) => ({
      ...prevObj,
      [key]: value,
    }));
  };

  useEffect(() => {
    onChange(changeObj);
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
        <Title>Configurações</Title>
        {notify && (
          <>
            <Label>Notificar apenas</Label>
            <Checkbox.Group
              options={notify}
              defaultValue={defaultConfig.notify}
              value={changeObj.notify}
              onChange={generateHandler('notify')}
            />
          </>
        )}
        {showQuantity && (
          <>
            <Label>Notificar a partir de</Label>
            <Input
              value={changeObj.quantity}
              onChange={(e) => generateHandler('quantity')(Number(e.target.value))}
              type="number"
              min="0"
              placeholder="Ex: 30"
            />
            elementos
          </>
        )}
        {showTime && (
          <>
            <Label>Notificar a partir de</Label>
            <Input
              value={changeObj.quantity}
              onChange={(e) => generateHandler('time')(Number(e.target.value))}
              type="number"
              min="0"
              placeholder="Ex: 30"
            />
            segundos
          </>
        )}
        {showColorPicker && (
          <>
            <Label>Definições de Seleção</Label>
            <Select onClick={() => setShowColor((prevShow) => !prevShow)}>
              <Color color={changeObj.color} />
              <DownOutlined />
            </Select>
            {showColor && (
              <ModalContainer>
                <Shadow onClick={() => setShowColor(false)} />
                <ChromePicker
                  color={changeObj.color}
                  onChangeComplete={({ hex }) => generateHandler('color')(hex)}
                />
              </ModalContainer>
            )}
          </>
        )}
        <ButtonContainer>
          <Button onClick={() => setChangeObj(defaultConfig)} clean>Limpar</Button>
          <Button save>Salvar</Button>
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
}

export default Options;
