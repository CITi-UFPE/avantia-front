import { css } from 'styled-components';

import colors from 'styles/colors';

export const flexcc = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flex = (justify: string, align: string, direction: string, wrap: string) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;

export const border = css`
  border: 1px solid ${colors.secondaryBackground};
`;
