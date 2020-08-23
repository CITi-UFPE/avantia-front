import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';
// import { useFormattedTime } from 'hooks';
// import { useInfo } from 'contexts/GlobalProvider';

import { Container } from './SessionTime.style';

function SessionTime({ transparent }: { transparent: boolean }) {
  // const [info] = useInfo();
  // const formattedTime = useFormattedTime(info.expiringDate);

  return (
    <Container style={{ opacity: transparent ? 1 : 0 }} disabled>
      <Paragraph noMargin color="orange">
        Tempo de sessão
      </Paragraph>
      <Title
        style={{ letterSpacing: '5px' }}
        fontSize="1.5rem"
        bold
        color="orange"
      >
        --:--
      </Title>
    </Container>
  );
}

export default SessionTime;
