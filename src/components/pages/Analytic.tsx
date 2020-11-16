import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import { PageCard, SecondaryBackground } from 'components/atoms';
import { Mask } from 'components/organisms/Analytics';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter, AnalyticNavbar, LastNotifications } from 'components/molecules';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useAxios } from 'global/func';
import { useMobile } from 'hooks';

function Analytic() {
  const [options, setOptions] = useState<OptionsConfig>();
  const [res, setRes] = useState(0);
  const isMobile = useMobile(700);
  const [notifications, setNotifications] = useState<(string | null)[]>([
    null, null, null, null, null,
  ]);

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
            <Mask
              options={options}
              addNotification={handleAddNotification}
            />
            <RecorderControls />
            <Options
              notify={[
                { value: 'mask', label: 'Pessoas com Máscara' },
                { value: 'nomask', label: 'Pessoas sem Máscara' },
              ]}
              onChange={setOptions}
            />
            <LastNotifications urlList={notifications} />
          </>
        ) : (
          <PageCard title="Analítico de detecção de máscara">
            <Row style={{ height: '100%' }} gutter={[10, 10]}>
              <Col style={{ height: '90%' }} span={16}>
                <Mask
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
                    { value: 'mask', label: 'Pessoas com Máscara' },
                    { value: 'nomask', label: 'Pessoas sem Máscara' },
                  ]}
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

export default Analytic;
