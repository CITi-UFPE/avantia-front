import React from 'react';

import {
  Card,
  Title,
  Dash,
} from './PageCard.style';

function PageCard({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <Card>
      <Title>
        {title}
        <Dash />
      </Title>
      {children}
    </Card>
  );
}

export default PageCard;
