import React from 'react';

import { StyledImage } from './Image.style';

type Props = {
  width: string;
  respWidth: string;
  src: string;
  alt?: string;
}

function Image({
  ...props
}: Props) {
  return (
    <StyledImage {...props} />
  );
}

export default Image;
