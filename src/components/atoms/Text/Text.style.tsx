import styled, { css } from 'styled-components';

import colors from 'styles/colors';

const typedColors = colors as { [key: string]: string };

type BaseTypes = {
  color?: string;
  bold?: boolean;
  fontSize?: string;
  margin?: string;
}

const base = css`
  ${({ bold }: BaseTypes) => (bold && css`
    font-weight: bolder;
  `)}
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => (color && (typedColors[color] || color)) || 'black'};
  margin: 0;
`;

type PTypes = {
  noMargin?: boolean;
}

export const Paragraph = styled.p`
  ${base}
  margin: ${({ noMargin }: PTypes & BaseTypes) => (noMargin ? '0' : '15px 0')};

  span {
    font-weight: bold;
  }
`;

export const Title = styled.h1`
  ${base}
`;
