import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useMobile } from 'hooks';
import { Button } from 'components/atoms';

import backArrowSvg from 'assets/icons/back-arrow.svg';
import shareSvg from 'assets/icons/share.svg';

import {
  Base,
  ButtonIcon,
  ShareIcon,
} from './ShareFooter.style';

function ShareFooter() {
  const [redirect, setRedirect] = useState('');
  const isMobile = useMobile();

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Base>
      <Button onClick={() => setRedirect('/analitico')}>
        <ButtonIcon src={backArrowSvg} />
        {(isMobile || isMobile === null) && 'Voltar para teste'}
      </Button>
      <Button style={{ color: 'white' }} type="primary">
        {(isMobile || isMobile === null) && 'Compartilhar'}
        <ShareIcon src={shareSvg} />
      </Button>
    </Base>
  );
}

export default ShareFooter;
