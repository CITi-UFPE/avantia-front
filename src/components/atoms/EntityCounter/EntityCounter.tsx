import React from 'react';

import {
  Container,
  Wrapper,
  Quantity,
  Amount,
  Warn,
} from './EntityCounter.style';

type EntityCounterProps = {
  amount: number,
  warn: boolean,
};

function EntityCounter({ amount, warn }: EntityCounterProps) {
  return (
    <Container>
      <Wrapper>
        <Quantity>Quantidade Detectada</Quantity>
        <Amount>{amount}</Amount>
      </Wrapper>
      {warn && <Warn>Aglomeração Detectada!</Warn>}
    </Container>
  );
}

export default EntityCounter;
