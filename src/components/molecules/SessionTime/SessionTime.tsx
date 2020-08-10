import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';
import useFormattedTime from 'hooks/useFormattedTime';
import { useInfo } from 'contexts/GlobalProvider';

import { Container } from './SessionTime.style';

function SessionTime() {
  const [info] = useInfo();
  const formattedTime = useFormattedTime(info.expiringDate);

  return (
    <Container disabled={!info.expiringDate}>
      <Paragraph noMargin color="orange">Tempo restante da sessão</Paragraph>
      <Title
        style={{ letterSpacing: '5px' }}
        fontSize="1.5rem"
        bold
        color={formattedTime === '00:00' ? 'error' : 'orange'}
      >
        {formattedTime}
      </Title>
    </Container>
  );
}

export default SessionTime;
