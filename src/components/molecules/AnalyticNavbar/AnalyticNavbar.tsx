import React from 'react';
import { Link } from 'react-router-dom';

import { Paragraph } from 'components/atoms/Text';
import { Image } from 'components/atoms';

import crowdingSvg from 'assets/icons/analytics/crowding.svg';
import crossingSvg from 'assets/icons/analytics/crossing.svg';
import maskSvg from 'assets/icons/analytics/mask.svg';
import timeSvg from 'assets/icons/analytics/time.svg';

import {
  Container,
  Card,
} from './AnalyticNavbar.style';

const CustomParagraph = ({ children }: { children: React.ReactNode }) => (
  <Paragraph
    fontSize=".7rem"
    noMargin
    style={{
      margin: '0 10px',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: '#707070',
    }}
  >
    {children}
  </Paragraph>
);

const CustomImage = ({ src }: { src: string }) => (
  <Image width="30px" respWidth="5px" src={src} />
);

function AnalyticNavbar() {
  return (
    <Container>
      <Link style={{ width: '100%' }} to="/livedemo/aglomeracao">
        <Card>
          <CustomImage src={crowdingSvg} />
          <CustomParagraph>Detecção de Aglomeração</CustomParagraph>
        </Card>
      </Link>
      <Link style={{ width: '100%' }} to="/livedemo/mascara">
        <Card>
          <CustomImage src={maskSvg} />
          <CustomParagraph>Detecção de Máscara</CustomParagraph>
        </Card>
      </Link>
      <Card disabled>
        <CustomImage src={crossingSvg} />
        <CustomParagraph>Cruzamento de Linha</CustomParagraph>
      </Card>
      <Card disabled>
        <CustomImage src={timeSvg} />
        <CustomParagraph>Tempo de Permanência</CustomParagraph>
      </Card>
    </Container>
  );
}

export default AnalyticNavbar;
