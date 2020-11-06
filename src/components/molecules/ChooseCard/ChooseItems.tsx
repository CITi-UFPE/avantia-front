import React from 'react';

const itemsContent = [
  ({ isMobile }: { isMobile: boolean }) => (
    <>
      <strong>
        Selecione
      </strong>
      {' '}
      um filtro de Soluções da Avantia na barra
      {' '}
      {isMobile ? 'abaixo' : 'ao lado'}
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
      ele para filmar
    </>
  ),
];

export default itemsContent;
