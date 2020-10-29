import styled from 'styled-components';
import { flexcc } from 'styles/variables';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
`;

export const Wrapper = styled.div`
  ${flexcc}
`;

const ItemBase = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: .6rem;
  margin-bottom: 5px;
  padding: 3px 8px;
`;

export const Quantity = styled(ItemBase)`
  background-color: #7bb0fa;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const Amount = styled(ItemBase)`
  background-color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #3A99A8;
`;

export const Warn = styled(ItemBase)`
  background-color: #D50915C9;
  border-radius: 5px;
  width: max-content;
`;
