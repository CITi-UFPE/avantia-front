import React from 'react';

import { Paragraph } from 'components/atoms/Text';

import {
  Base,
  AccessCounterContainer,
} from './AccessCounter.style';

function AccessCounter({ quantity }: { quantity: number }) {
  return (
    <Base>
      <AccessCounterContainer>
        {quantity}
      </AccessCounterContainer>
      <Paragraph color="blue" noMargin>usuários já utilizaram essa demonstração</Paragraph>
    </Base>
  );
}

export default AccessCounter;
