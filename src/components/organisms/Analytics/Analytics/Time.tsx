import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Redirect } from 'react-router-dom';

import { Loader } from 'components/atoms';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { Video, TimeCanvas } from 'components/molecules';
import { useAxios } from 'global/func';
import { useInfo } from 'contexts/GlobalProvider';
import imageToBlob from 'helpers/imageToBlob';

import { Container } from '../Analytic.style';

function Time({
  options,
  addNotification,
}: {
  options?: OptionsConfig,
  addNotification: (url: string) => void,
}) {
  const [dimensions, setDimensions] = useState<number[]>([]);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement>();
  const [detections, setDetections] = useState<ServerResponse[]>();
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

        const res = await new Promise<any>((resolve) => {
          (async () => {
            const axiosRes = await axiosPost({
              url: '/common',
              body: formData,
            });
            resolve(axiosRes);
          })();
          setTimeout(() => {
            resolve(null);
          }, 4000);
        });

        if (!res) {
          sendImage();
          return;
        }

        const serverResponse: ServerResponse[] = res.data.data;
        const { expiringDate } = res.data;

        setDetections(serverResponse);
        setInfo((prevInfo: any) => ({
          ...prevInfo,
          latency: Date.now() - before,
          ...(prevInfo.expiringDate ? {} : { expiringDate }),
        }));
        sendImage();
      } catch (err) {
        console.log(err);
        if (err.response?.status === 403) {
          setRedirect('/livedemo/expired');
        } else {
          sendImage();
        }
      }
    };
    sendImage();
  }, [videoElement, setInfo, axiosPost]);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Container>
      <Video getDimensions={handleDimensions} />
      {dimensions.length > 0 ? (
        <TimeCanvas
          color={options?.color}
          limitTime={options?.time}
          addNotification={addNotification}
          detections={detections?.filter(({ label }) => (
            options?.notify.includes(label)
          )) || []}
          dimensions={dimensions}
        />
      ) : <Loader width={`${dimensions[1] || 0}px`} height={`${dimensions[0] || 0}px`} />}
    </Container>
  );
}

Time.defaultProps = {
  options: {
    quantity: 0,
  },
};

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'person' | 'truck' | 'car' | 'bus';
}

export default Time;
