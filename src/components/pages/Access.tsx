import React, { useEffect, useState } from 'react';

import { Background } from 'components/atoms';
import { AccessCard } from 'components/molecules';
import AccessCounter from 'components/molecules/AccessCounter';
import { useAxios } from 'global/func';

function Access() {
  const [axiosGet] = useAxios('get');
  const [res, setRes] = useState(0);

  useEffect(() => {
    axiosGet({ url: '/accesses', setState: setRes });
  }, [axiosGet]);

  return (
    <>
      <Background>
        <AccessCard />
      </Background>
      <AccessCounter quantity={res} />
    </>
  );
}

export default Access;
