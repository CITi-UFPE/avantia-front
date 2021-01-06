import React from 'react';

const itemsContent = [
  ({ isMobile }: { isMobile: boolean }) => (
    <>
      <strong>
        Selecione
      </strong>
      {' '}
      uma das opções de analítico da Avantia no menu
      {' '}
      {isMobile ? 'abaixo' : 'a direita'}
      .
    </>
  ),
  () => (
    <>
      <strong>
        Clique
      </strong>
      {' '}
      no botão circular para tirar foto, ou
      {' '}
      <strong>
        segure
      </strong>
      {' '}
      ele para filmar.
    </>
  ),
];

export default itemsContent;
