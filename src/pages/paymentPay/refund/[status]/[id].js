import { useMemo, useEffect } from 'react';
import { connect, useLocation, useParams } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Payment';
import pagination from '@/utils/pagination';

const paymentPay = ({ 
  orderRefund, aftersaleRefund,
  getOrderRefundInfo, getAftersalePayInfo
 }) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { status, id } = useParams();
  console.log(useParams())
  useEffect(() => {
    // status === 'order' && getOrderRefundInfo({
    //   did: depart_id,
    //   id
    // })
    // status === 'aftersale' && getAftersalePayInfo({
    //   did: depart_id,
    //   id
    // })
  }, [])
  return (
    <Card style={{height: '100%', width: '100%'}}>
      
    </Card>
  )
}


export default connect(mapStateToProps,mapDispatchToProps)(paymentPay);