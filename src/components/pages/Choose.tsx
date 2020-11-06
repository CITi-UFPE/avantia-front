import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import { SecondaryBackground, PageCard } from 'components/atoms';
import { ChooseCard, AnalyticNavbar, AccessCounter } from 'components/molecules';
import { useMobile } from 'hooks';
import { useAxios } from 'global/func';

function Choose() {
  const isMobile = useMobile(700);
  const [axiosGet] = useAxios('get');

  const [res, setRes] = useState(0);

  useEffect(() => {
    axiosGet({ url: '/accesses', setState: setRes });
  }, [axiosGet]);

  return (
    <>
      <SecondaryBackground mobileHigher>
        {isMobile ? (
          <ChooseCard />
        ) : (
          <PageCard title="Seletor de Analíticos">
            <Row gutter={[10, 10]}>
              <Col span={16}>
                <ChooseCard />
              </Col>
              <Col span={8}>
                <AnalyticNavbar />
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

export default Choose;
