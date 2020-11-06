import React from 'react';

import captureSvg from 'assets/icons/capture.svg';
import touchSvg from 'assets/icons/touch.svg';
import { useMobile } from 'hooks';

import {
  AccessBackground,
  TextContainer,
  AccessItemContainer,
  AccessItem,
  Image,
  AccessText,
} from './ChooseCard.style';
import chooseItems from './ChooseItems';

function ChooseCard() {
  const isMobile = useMobile(700);

  return (
    <AccessBackground>
      <TextContainer>
        <AccessItemContainer>
          {chooseItems.map((Item, i) => (
            <AccessItem>
              <Image src={[touchSvg, captureSvg][i]} />
              <AccessText>
                {isMobile !== null && <Item isMobile={isMobile} />}
              </AccessText>
            </AccessItem>
          ))}
        </AccessItemContainer>
      </TextContainer>
    </AccessBackground>
  );
}

export default ChooseCard;
