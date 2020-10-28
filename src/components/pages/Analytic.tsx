import React, { useState } from 'react';
import { Row, Col } from 'antd';

import { PageCard, SecondaryBackground } from 'components/atoms';
import { Mask } from 'components/organisms/Analytics';
import { Options, RecorderControls } from 'components/organisms';
import { AccessCounter } from 'components/molecules';
import { OptionsConfig } from 'components/organisms/Options/Options';

function Analytic() {
  const [options, setOptions] = useState<OptionsConfig>();

  return (
    <>
      <SecondaryBackground>
        <PageCard title="Analítico de detecção de máscara">
          <Row gutter={[10, 10]}>
            <Col span={16}>
              <Mask options={options} />
              <RecorderControls />
            </Col>
            <Col span={8}>
              <Options
                notify={[
                  { value: 'mask', label: 'Pessoas com Máscara' },
                  { value: 'nomask', label: 'Pessoas sem Máscara' },
                ]}
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

export default Analytic;
