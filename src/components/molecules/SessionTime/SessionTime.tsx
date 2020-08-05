import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';

import { Container } from './SessionTime.style';

function SessionTime() {
  return (
    <Container>
      <Paragraph color="orange">Tempo restante da sessão</Paragraph>
      <Title bold color="orange">05:00</Title>
    </Container>
  );
}

export default SessionTime;
