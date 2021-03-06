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
  Descriptions,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Order';
import pagination from '@/utils/pagination';
import { orderTypesPlain } from '@/const/oomall.tsx';
import { format2Day } from '@/utils/time.tsx';
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
  const handleDeleteOrder = async ({ shopId, id }) => {
    await deleteOrderById({
      shopId,
      id,
    });
    await getAllOrder({
      shopId: depart_id,
      page: orderPage,
      pagesize: orderPageSize,
    });
  };
  const onFormFinish = value => {
    const { customId, orderSn } = value;
    // const [beginTime, endTime] = dateRange;
    getAllOrder({
      customId,
      orderSn,
      // beginTime: beginTime.format("YYYY-MM-DD"),
      // endTime: endTime.format("YYYY-MM-DD"),
      shopId: depart_id,
      page: orderPage,
      pagesize: orderPageSize,
    });
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
      shopId: depart_id,
      page: orderPage,
      pagesize: orderPageSize,
    });
    console.log('fetch new ');
  }, [orderPage, orderPageSize]);
  const columns = useMemo(() => {
    return [
      {
        title: '??????id',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      // {
      //   title: 'pid',
      //   dataIndex: 'pid',
      //   key: 'pid',
      // },
      {
        title: '????????????',
        dataIndex: 'orderType',
        key: 'orderType',
        render: (text, record) => {
          const colors = ['#f50', '#2db7f5', '#87d068'];
          return text ? (
            <Tag color={colors[text]}>{orderTypesPlain[text]}</Tag>
          ) : (
            '??????'
          );
        },
      },
      {
        title: '??????',
        dataIndex: 'state',
        key: 'state',
      },
      // {
      //   title: '?????????',
      //   dataIndex: 'subState',
      //   key: 'subState',
      // },
      {
        title: '??????',
        dataIndex: 'originPrice',
        key: 'originPrice',
        render: text => {
          return text || '0';
        },
      },
      {
        title: '?????????',
        dataIndex: 'discountPrice',
        key: 'discountPrice',
        render: text => {
          return text || '0';
        },
      },
      {
        title: '??????',
        dataIndex: 'freightPrice',
        key: 'freightPrice',
        render: text => {
          return text || '0';
        },
      },
      {
        title: '???????????? ',
        dataIndex: 'shipmentSn',
        key: 'shipmentSn',
        render: text => {
          return text || '0000';
        },
      },
      {
        title: '????????????',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '??????',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => handleClickDetail(record)}>
                ????????????
              </Button>
              <Button type="danger" onClick={() => handleDeleteOrder(record)}>
                ????????????
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
          {/* <Form.Item label="????????????" name="dateRange">
            <RangePicker />
          </Form.Item> */}
          <Form.Item label="??????id" name="customId">
            <Input />
          </Form.Item>
          <Form.Item label="????????????" name="orderSn">
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                ??????
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
        title="????????????"
        okText={[]}
        onCancel={() => setDetailModalVisible(false)}
      >
        <Descriptions column={2}>
          <Descriptions.Item label="?????????">
            {orderDetail.consignee}
          </Descriptions.Item>
          <Descriptions.Item label="?????????">
            {orderDetail.mobile}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {orderDetail.address}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {orderDetail.freightPrice}
          </Descriptions.Item>
          <Descriptions.Item label="?????????">
            {orderDetail.orderSn}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {orderDetail.orderType}
          </Descriptions.Item>
        </Descriptions>
        {state === 0 ? (
          <Form size="small" layout="inline" onFinish={handleDeliverSubmit}>
            <Form.Item label="??????????????????" name="freightSn">
              <Space>
                <Input />
                <Button type="primary" htmlType="submit">
                  ????????????
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
