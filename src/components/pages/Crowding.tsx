import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Crowding } from 'components/organisms/Analytics';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { PageCard, SecondaryBackground } from 'components/atoms';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter, AnalyticNavbar, LastNotifications } from 'components/molecules';
import { useAxios } from 'global/func';
import { useMobile } from 'hooks';

function CrowdingAnalytic() {
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
            <Crowding
              options={options}
              addNotification={handleAddNotification}
            />
            <RecorderControls referrer="aglomeracao" />
            <Options
              notify={[
                { value: 'person', label: 'Pessoas' },
                { value: 'car', label: 'Carros' },
                { value: 'truck', label: 'Caminhões' },
                { value: 'bus', label: 'Ônibus' },
              ]}
              showQuantity
              showColorPicker
              onChange={setOptions}
              mobileHeight="22rem"
              analyticName="Detecção de Aglomeração"
            />
            <LastNotifications urlList={notifications} />
          </>
        ) : (
          <PageCard title="Analítico de detecção de aglomeração">
            <Row style={{ height: '100%' }} gutter={[10, 10]}>
              <Col style={{ height: '90%' }} span={16}>
                <Crowding
                  options={options}
                  addNotification={handleAddNotification}
                />
                <RecorderControls referrer="aglomeracao" />
              </Col>
              <Col style={{ height: '90%', overflow: 'auto' }} span={8}>
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
                  showQuantity
                  showColorPicker
                  onChange={setOptions}
                  analyticName="Detecção de Aglomeração"
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

export default CrowdingAnalytic;
