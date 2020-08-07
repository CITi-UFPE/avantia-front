import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';

import { Container } from './SessionTime.style';

function SessionTime() {
  return (
    <Container>
      <Paragraph noMargin color="orange">Tempo restante da sessão</Paragraph>
      <Title fontSize="1.5rem" bold color="orange">20:00</Title>
    </Container>
  );
}

export default SessionTime;
