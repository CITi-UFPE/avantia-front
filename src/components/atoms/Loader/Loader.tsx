import React from 'react';

import { ReactComponent as LoaderSvg } from 'assets/icons/loader.svg';

import {
  Base,
} from './Loader.style';

function Loader({ normal, width, height }: { normal?: boolean, height?: string, width?: string }) {
  return (
    <Base normal={normal} style={{ width, height }}>
      <LoaderSvg style={{ width: '5rem' }} />
    </Base>
  );
}

Loader.defaultProps = {
  normal: false,
  width: 'auto',
  height: 'auto',
};

export default Loader;
