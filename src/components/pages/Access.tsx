import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import { SecondaryBackground, PageCard } from 'components/atoms';
import { AccessCard, AnalyticNavbar, AccessCounter } from 'components/molecules';
import { useAxios } from 'global/func';
import { useMobile } from 'hooks';

function Access() {
  const [axiosGet] = useAxios('get');
  const isMobile = useMobile(700);
  const [res, setRes] = useState(0);

  useEffect(() => {
    axiosGet({ url: '/accesses', setState: setRes });
  }, [axiosGet]);

  return (
    <>
      <SecondaryBackground>
        {isMobile ? (
          <AccessCard />
        ) : (
          <PageCard title="Seletor de Analíticos">
            <Row gutter={[10, 10]}>
              <Col span={16}>
                <AccessCard />
              </Col>
              <Col span={8}>
                <AnalyticNavbar />
              </Col>
            </Row>
          </PageCard>
        )}
      </SecondaryBackground>
      <AccessCounter quantity={res} />
    </>
  );
}

export default Access;
