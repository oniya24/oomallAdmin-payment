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
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Time';
import pagination from '@/utils/pagination';
const newAdmin = ({
  adverSegList,
  adverSegTotal,
  adverSegPage,
  adverSegPageSize,
  getAllAdvertiseSegments,
  postCreateAdvertiseSegments,
  deleteAdvertiseSegmentsById,
  saveAdverPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const deleteAdverSeg = async ({ id }) => {
    await deleteAdvertiseSegmentsById({
      did: depart_id,
      id,
    });
  };
  const handleCreateAdverSeg = () => {
    setModalVisible(true);
  };
  const handleSubmitCreate = () => {
    form.validateFields(['beginTime', 'endTime']).then(value => {
      console.log(value);
      // await postCreateAdvertiseSegments(value)
      setModalVisible(false);
    });
    // postCreateAdvertiseSegments
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="danger" onClick={() => deleteAdverSeg(record)}>
                删除时间段
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getAllAdvertiseSegments({
    //   did: depart_id,
    //   page: adverSegPage,
    //   pageSize: adverSegPageSize
    // });
    console.log('fetch new');
  }, [adverSegPage, adverSegPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateAdverSeg}>
          创建广告时间段
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(adverSegTotal, saveAdverPagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={adverSegList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        onOk={handleSubmitCreate}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} preserve={false}>
          <Form.Item label="开始时间" name="beginTime" required>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="结束时间" name="endTime" required>
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(newAdmin);
