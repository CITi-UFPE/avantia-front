import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Crowding } from 'components/organisms/Analytics';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { PageCard, SecondaryBackground } from 'components/atoms';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter } from 'components/molecules';
import { useAxios } from 'global/func';

function CrowdingAnalytic() {
  const [options, setOptions] = useState<OptionsConfig>();

  const [res, setRes] = useState(0);

  const [axiosGet] = useAxios('get');

  useEffect(() => {
    axiosGet({ url: '/accesses', setState: setRes });
  }, [axiosGet]);

  return (
    <>
      <SecondaryBackground>
        <PageCard title="Analítico de detecção de aglomeração">
          <Row style={{ height: '100%' }} gutter={[10, 10]}>
            <Col style={{ height: '90%' }} span={16}>
              <Crowding options={options} />
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
                showQuantity
                showColorPicker
                onChange={setOptions}
              />
            </Col>
          </Row>
        </PageCard>
      </SecondaryBackground>
      <AccessCounter quantity={res} />
    </>
  );
}

export default CrowdingAnalytic;
