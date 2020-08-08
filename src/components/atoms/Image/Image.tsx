import React from 'react';

import { StyledImage } from './Image.style';

type Props = {
  width: string;
  respWidth: string;
  src: string;
  alt?: string;
}

function Image({
  src,
  width,
  respWidth,
  alt,
  ...props
}: Props) {
  return (
    <StyledImage src={src} respWidth={respWidth} width={width} alt={alt} {...props} />
  );
}

export default Image;
