import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { SecondaryBackground, Button, Loader } from 'components/atoms';
import { VideoPlayer } from 'components/molecules';
import { useAxios } from 'global/func';

import {
  Container,
  Image,
  Footer,
} from './Share.style';

function Share({ match }: { match: any }) {
  const [data, setData] = useState('');
  const [type, setType] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [axiosGet] = useAxios('get');

  const { mediaId } = match.params;

  useEffect(() => {
    axiosGet({
      url: `/uploads/${mediaId}`,
      setState: setData,
      process: (file: any) => {
        setType(file.type);
        return `data:${file.type === 'image' ? 'image/png' : 'video/webm'};base64,${file.content}`;
      },
    });
  }, [axiosGet, mediaId]);

  if (redirect) return <Redirect to="/livedemo" />;

  return (
    <>
      <SecondaryBackground>
        <Container>
          {type === 'image' && <Image src={data} />}
          {type === 'video' && <VideoPlayer src={data as any as Blob[]} />}
          {!type && <Loader normal />}
        </Container>
      </SecondaryBackground>
      <Footer>
        <Button onClick={() => setRedirect(true)} style={{ color: 'white' }} type="primary">Faça seu teste!</Button>
      </Footer>
    </>
  );
}

export default Share;
