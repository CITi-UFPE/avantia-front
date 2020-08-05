import styled, { css } from 'styled-components';

import colors from 'styles/colors';

const typedColors = colors as { [key: string]: string };

type BaseTypes = {
  color?: string;
  bold?: boolean;
}

const base = css`
  ${({ bold }: BaseTypes) => (bold && css`
    font-weight: bolder;
  `)}
  color: ${({ color }) => (color && (typedColors[color] || color))};
  margin: 0;
`;

export const Paragraph = styled.p`
  ${base}
`;

export const Title = styled.h1`
  ${base}
`;
