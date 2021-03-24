import { useMemo, useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  Input,
  Tag,
  Modal,
  DatePicker,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Order';
import pagination from '@/utils/pagination';
import { orderTypesPlain } from '@/const/oomall.tsx';
const { RangePicker } = DatePicker;

const userManage_comment = ({
  orderList,
  orderTotal,
  orderPage,
  orderPageSize,
  orderDetail,
  getAllOrder,
  getOrderById,
  putModifyOrder,
  deleteOrderById,
  putDeliverOrder,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { state } = orderDetail;
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const formRef = useRef();
  const handleClickDetail = async ({ shopId, id }) => {
    await getOrderById({
      shopId,
      id,
    });
    setDetailModalVisible(true);
  };
  const handleDeleteOrder = ({ shopId, id }) => {
    deleteOrderById({
      shopId,
      id,
    });
  };
  const onFormFinish = value => {
    const { dateRange, type, state } = value;
    console.log(dateRange);
    const [beginTime, endTime] = dateRange;
    getAllOrder({});
    console.log('fetch new');
  };
  const onFormReset = value => {
    console.log(value);
    formRef.current.resetFields();
  };
  const handleDeliverSubmit = value => {
    const { shopId, id } = orderDetail;
    console.log(value);
    putDeliverOrder({
      shopId,
      id,
      ...value,
    });
  };
  useEffect(() => {
    getAllOrder({
      page: orderPage,
      pagesize: orderPageSize,
    });
    console.log('fetch new ');
  }, [orderPage, orderPageSize]);
  const columns = useMemo(() => {
    return [
      {
        title: '用户id',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      {
        title: 'pid',
        dataIndex: 'pid',
        key: 'pid',
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        render: (text, record) => {
          const colors = ['#f50', '#2db7f5', '#87d068'];
          return <Tag color={colors[text]}>{orderTypesPlain[text]}</Tag>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '子状态',
        dataIndex: 'subState',
        key: 'subState',
      },
      {
        title: '原价',
        dataIndex: 'originPrice',
        key: 'originPrice',
      },
      {
        title: '折后价',
        dataIndex: 'discountPrice',
        key: 'discountPrice',
      },
      {
        title: '运费',
        dataIndex: 'freightPrice',
        key: 'freightPrice',
      },
      {
        title: '运送编码 ',
        dataIndex: 'shipmentSn',
        key: 'shipmentSn',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => handleClickDetail(record)}>
                查看详情
              </Button>
              <Button type="danger" onClick={() => handleDeleteOrder(record)}>
                取消订单
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <Card>
        <Form
          ref={formRef}
          size="middle"
          layout="inline"
          onFinish={onFormFinish}
          onReset={onFormReset}
        >
          <Form.Item label="选择范围" name="dateRange">
            <RangePicker />
          </Form.Item>
          <Form.Item label="顾客id" name="customId">
            <Input />
          </Form.Item>
          <Form.Item label="订单编号" name="orderSn">
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          scroll={{ x: true }}
          pagination={pagination(orderTotal, savePagination)}
          rowKey={record => record.dataIndex}
          columns={columns}
          dataSource={orderList}
        ></Table>
      </Card>
      <Modal
        visible={detailModalVisible}
        title="订单详情"
        okText={[]}
        onCancel={() => setDetailModalVisible(false)}
      >
        {JSON.stringify(orderDetail)}
        {state === 0 ? (
          <Form size="small" layout="inline" onFinish={handleDeliverSubmit}>
            <Form.Item label="商家发货编号" name="freightSn">
              <Space>
                <Input />
                <Button type="primary" htmlType="submit">
                  提交单号
                </Button>
              </Space>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(userManage_comment);
