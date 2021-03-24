import { useMemo, useEffect } from 'react';
import { connect, useLocation, useParams } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Payment';
import pagination from '@/utils/pagination';

const paymentPay = ({ postCreatePaymentInfo }) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  useEffect(() => {
    // postCreatePaymentInfo({
    //   did: depart_id,
    //   id,
    //   amount: 15
    // })
  }, []);
  return <Card style={{ height: '100%', width: '100%' }}></Card>;
};

export default connect(mapStateToProps, mapDispatchToProps)(paymentPay);
