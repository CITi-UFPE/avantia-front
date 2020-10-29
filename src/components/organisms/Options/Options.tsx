import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';

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
} from './Options.style';

const defaultConfig: OptionsConfig = {
  notify: ['mask', 'person'],
  quantity: 10,
  color: '#4BBFD1',
};

type OptionsProps = {
  notify?: { value: string, label: string }[],
  showQuantity?: boolean,
  showColorPicker?: boolean,
  onChange: (changeObj: typeof defaultConfig) => void,
};

function Options({
  notify,
  onChange,
  showQuantity = false,
  showColorPicker = false,
}: OptionsProps) {
  const [changeObj, setChangeObj] = useState(defaultConfig);
  const [showColor, setShowColor] = useState(false);

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
    <Card>
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
          pessoas
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
  );
}

export type OptionsConfig = {
  notify: ('mask' | 'nomask' | 'person' | 'car' | 'truck' | 'bus')[],
  quantity: number,
  color: string,
}

export default Options;
