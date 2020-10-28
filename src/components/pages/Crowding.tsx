import React, { useState } from 'react';
import { Row, Col } from 'antd';

import { Crowding } from 'components/organisms/Analytics';
import { OptionsConfig } from 'components/organisms/Options/Options';
import { PageCard, SecondaryBackground } from 'components/atoms';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter } from 'components/molecules';

function CrowdingAnalytic() {
  const [options, setOptions] = useState<OptionsConfig>();

  return (
    <>
      <SecondaryBackground>
        <PageCard title="Analítico de detecção de aglomeração">
          <Row gutter={[10, 10]}>
            <Col span={16}>
              <Crowding options={options} />
              <RecorderControls />
            </Col>
            <Col span={8}>
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
      <AccessCounter quantity={10} />
    </>
  );
}

export default CrowdingAnalytic;
