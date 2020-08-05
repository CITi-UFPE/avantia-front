import React from 'react';

import { StyledImage } from './Image.style';

type Props = {
  width: string;
  src: string;
  alt?: string;
}

function Image({ src, width, alt, ...props }: Props) {
  return (
    <StyledImage src={src} width={width} alt={alt} {...props} />
  );
}

export default Image;
