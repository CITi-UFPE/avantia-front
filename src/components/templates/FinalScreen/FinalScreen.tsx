import React from 'react';

import { Title, Paragraph } from 'components/atoms/Text';
import { FinalInfo } from 'components/molecules';

import {
  BackgroundBase, ContentContainer,
} from './FinalScreen.style';

type FinalScreenProps = {
  title: string;
  text: string;
};

function FinalScreen({ title, text }: FinalScreenProps) {
  return (
    <BackgroundBase>
      <ContentContainer>
        <div>
          <Title fontSize="1rem" style={{ textAlign: 'center' }} bold color="error">
            {title }
          </Title>
          <Paragraph fontSize=".7rem" style={{ textAlign: 'center' }}>
            {text}
          </Paragraph>
        </div>
        <FinalInfo />
      </ContentContainer>
    </BackgroundBase>
  );
}

export default FinalScreen;
