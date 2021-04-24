import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  DatePicker,
  Modal,
  Input,
} from 'antd';

const presale = () => {
  const presaleList = [
    {
      id: 1,
      name: '劳动节预售活动',
      startTime: '2021-04-27 20:00:00',
      timeToPay: '2021-05-01 00:00:00',
      endTime: '2021-05-03 10:00:00',
      startMoney: 15,
      endMoney: 65,
      skuId: 247,
      state: 0,
    },
    {
      id: 2,
      name: '端午节预售活动',
      startTime: '2021-04-27 20:00:00',
      timeToPay: '2021-05-01 00:00:00',
      endTime: '2021-05-03 10:00:00',
      startMoney: 66,
      endMoney: 125,
      skuId: 248,
      state: 1,
    },
  ];
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '活动名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '开始支付尾款时间',
        dataIndex: 'timeToPay',
        key: 'timeToPay',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '定金金额',
        dataIndex: 'startMoney',
        key: 'startMoney',
      },
      {
        title: '尾款金额',
        dataIndex: 'endMoney',
        key: 'endMoney',
      },
      {
        title: '商品skuId',
        dataIndex: 'skuId',
        key: 'skuId',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record;
          return (
            <Space>
              {Number(state) === 0 ? (
                <Button type="primary">上架活动</Button>
              ) : (
                <Button type="primary">下架活动</Button>
              )}
              <Button type="default">修改活动信息</Button>
              <Button type="danger">删除活动</Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary">创建预售活动</Button>
      </div>
      <Table
        scroll={{ x: true }}
        // pagination={pagination(shareTotal, saveAdverPagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={presaleList}
      ></Table>
    </Card>
  );
};

export default presale;
