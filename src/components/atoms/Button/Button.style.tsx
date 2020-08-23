import styled from 'styled-components';
import { Button } from 'antd';

import { flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const StyledButton = styled(Button)`
  ${flexcc}
  text-transform: uppercase;
  font-weight: bolder;
  border-radius: 5px;
  height: min-content;
  padding: 10px 15px;
  color: ${colors.orange};
`;
