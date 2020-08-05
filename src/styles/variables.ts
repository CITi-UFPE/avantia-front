import { css } from 'styled-components';

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
