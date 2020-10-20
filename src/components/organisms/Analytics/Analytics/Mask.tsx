import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { Loader } from 'components/atoms';
import { Video, Canvas } from 'components/molecules';
import { useAxios } from 'global/func';
import { useInfo } from 'contexts/GlobalProvider';
import imageToBlob from 'helpers/imageToBlob';

import { Container } from '../Analytic.style';

function Mask() {
  const [dimensions, setDimensions] = useState<number[]>([]);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement>();
  const [filters, setFilters] = useState<ServerResponse[]>();
  const [redirect, setRedirect] = useState('');

  const [axiosPost] = useAxios('post');

  const [, setInfo] = useInfo();

  const handleDimensions = useCallback((values: number[], video: HTMLVideoElement) => {
    setDimensions(values);
    setVideoElement(video);
  }, [setDimensions, setVideoElement]);

  useEffect(() => {
    const sendImage = async () => {
      try {
        const blob = await imageToBlob(videoElement);
        const formData = new FormData();

        formData.set('image', blob);

        const before = Date.now();

        const res = await axiosPost({
          url: '/image',
          body: formData,
        });
        const serverResponse: ServerResponse[] = res.data.data;
        const { expiringDate } = res.data;

        setFilters(serverResponse);
        setInfo((prevInfo: any) => ({
          ...prevInfo,
          latency: Date.now() - before,
          ...(prevInfo.expiringDate ? {} : { expiringDate }),
        }));
        setTimeout(sendImage, 1000);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 403) {
          setRedirect('/livedemo/expired');
        }
      }
    };
    sendImage();
  }, [videoElement, setInfo, axiosPost]);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Container>
      <Video getDimensions={handleDimensions} />
      {dimensions.length > 0 && filters ? (
        <Canvas filters={filters} dimensions={dimensions} />
      ) : <Loader width={`${dimensions[1] || 0}px`} height={`${dimensions[0] || 0}px`} />}
    </Container>
  );
}

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'mask' | 'nomask';
}

export default Mask;
