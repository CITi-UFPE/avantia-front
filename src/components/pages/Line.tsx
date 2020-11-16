import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Line } from 'components/organisms/Analytics';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { PageCard, SecondaryBackground } from 'components/atoms';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter, AnalyticNavbar, LastNotifications } from 'components/molecules';
import { useAxios } from 'global/func';
import { useMobile } from 'hooks';

function LineAnalytic() {
  const [options, setOptions] = useState<OptionsConfig>();
  const isMobile = useMobile(700);
  const [notifications, setNotifications] = useState<(string | null)[]>([
    null, null, null, null, null,
  ]);

  const [res, setRes] = useState(0);

  const [axiosGet] = useAxios('get');

  useEffect(() => {
    axiosGet({ url: '/accesses', setState: setRes });
  }, [axiosGet]);

  const handleAddNotification = (url: string) => {
    const notificationsCopy = [...notifications];
    notificationsCopy.pop();
    setNotifications([url, ...notificationsCopy]);
  };

  return (
    <>
      <SecondaryBackground mobileHigher>
        {isMobile ? (
          <>
            <Line
              options={options}
              addNotification={handleAddNotification}
            />
            <RecorderControls />
            <Options
              notify={[
                { value: 'person', label: 'Pessoas' },
                { value: 'car', label: 'Carros' },
                { value: 'truck', label: 'Caminhões' },
                { value: 'bus', label: 'Ônibus' },
              ]}
              showColorPicker
              onChange={setOptions}
              mobileHeight="17rem"
            />
            <LastNotifications urlList={notifications} />
          </>
        ) : (
          <PageCard title="Analítico de cruzamento de linha">
            <Row style={{ height: '100%' }} gutter={[10, 10]}>
              <Col style={{ height: '90%' }} span={16}>
                <Line
                  options={options}
                  addNotification={handleAddNotification}
                />
                <RecorderControls />
              </Col>
              <Col span={8}>
                <Link
                  to="/livedemo/acesso"
                  style={{
                    textTransform: 'uppercase',
                    color: '#3FA3B0',
                    fontSize: '.6rem',
                  }}
                >
                  <LeftOutlined />
                  Selecione outro analítico de vídeo
                </Link>
                <Options
                  notify={[
                    { value: 'person', label: 'Pessoas' },
                    { value: 'car', label: 'Carros' },
                    { value: 'truck', label: 'Caminhões' },
                    { value: 'bus', label: 'Ônibus' },
                  ]}
                  showColorPicker
                  onChange={setOptions}
                />
                <LastNotifications urlList={notifications} />
              </Col>
            </Row>
          </PageCard>
        )}
      </SecondaryBackground>
      <AnalyticNavbar mobile />
      {!isMobile && <AccessCounter quantity={res} />}
    </>
  );
}

export default LineAnalytic;
