import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';

import { Container } from './SessionTime.style';

function SessionTime() {
  return (
    <Container disabled>
      <Paragraph noMargin color="orange">Tempo restante da sessão</Paragraph>
      <Title style={{ letterSpacing: '5px' }} fontSize="1.5rem" bold color="orange">--:--</Title>
    </Container>
  );
}

export default SessionTime;
