import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';
import { useFormattedTime, useMobile } from 'hooks';
import { useInfo } from 'contexts/GlobalProvider';

import { Container } from './SessionTime.style';

function SessionTime({ transparent }: { transparent: boolean }) {
  const [info] = useInfo();
  const formattedTime = useFormattedTime(info.expiringDate);
  const isMobile = useMobile();

  return (
    <Container style={{ opacity: transparent ? 1 : 0 }} disabled={!info.expiringDate}>
      <Paragraph noMargin color="orange">
        {(isMobile || isMobile === null) ? 'Tempo restante da sessão' : 'Tempo de sessão'}
      </Paragraph>
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
