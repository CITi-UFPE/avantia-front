import React from 'react';

import { ReactComponent as LoaderSvg } from 'assets/icons/loader.svg';

import {
  Base,
} from './Loader.style';

function Loader({ normal }: { normal?: boolean }) {
  return (
    <Base normal={normal}>
      <LoaderSvg style={{ width: '5rem' }} />
    </Base>
  );
}

Loader.defaultProps = {
  normal: false,
};

export default Loader;
