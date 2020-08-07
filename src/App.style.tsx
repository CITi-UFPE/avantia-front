import styled from 'styled-components';

import { flex } from 'styles/variables';

export const AppWrapper = styled.article`
  ${flex('flex-start', 'center', 'column', 'nowrap')}
  flex-flow: column;
  height: 100vh;
`;
