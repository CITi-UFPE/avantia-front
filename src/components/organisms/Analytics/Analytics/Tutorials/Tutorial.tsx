import React, { useState } from 'react';

import {
  Base,
} from './Tutorials.style';
import contents from './contents';

function Tutorial({
  children,
  type,
}: {
  children: React.ReactNode,
  type: ('crowding' | 'line' | 'time')
}) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <Base onClick={() => setShow(true)}>
      {contents[type] || null}
    </Base>
  );
}

export default Tutorial;
