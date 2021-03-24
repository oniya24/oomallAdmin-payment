import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
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
  Select,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Freight';
import pagination from '@/utils/pagination';
const { Option } = Select;
const freight = ({
  freightList,
  freightTotal,
  freightPage,
  freightPageSize,
  postDefineShopFreightModel,
  getShopFreightModel,
  putModifyFreightModel,
  deleteFreightModel,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteFreight = async ({ id }) => {
    await deleteFreightModel({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateFreight = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyFreight = record => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    // form.setFieldsValue(record)
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(value => {
      // await postDefineShopFreightModel(value)
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(value => {
      // await putModifyFreightModel(value)
      setModalVisible(false);
    });
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'unit',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '是否是默认',
        dataIndex: 'default',
        key: 'default',
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
          const { id } = record;
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => handleModifyFreight(record)}
              >
                修改活动信息
              </Button>
              <Button
                type="default"
                onClick={() => history.push(`/freight/${id}`)}
              >
                查看详情
              </Button>
              <Button type="danger" onClick={() => handledeleteFreight(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getShopFreightModel({
    //   shopId: depart_id,
    //   page: freightPage,
    //   pageSize: freightPageSize
    // });
    console.log('fetch new');
  }, [freightPage, freightPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateFreight}>
          创建运费模板
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(freightTotal, savePagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={freightList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        onOk={() =>
          Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify()
        }
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="活动名"
            name="name"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) === 0 ? (
            <Form.Item
              label="类型"
              name="type"
              required
              rules={[{ required: true, message: '请输入价格' }]}
            >
              <Select>
                <Option value="1">类型1</Option>
                <Option value="2">类型2</Option>
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            label="单元"
            name="unit"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Select>
              <Option value="1">unit1</Option>
              <Option value="2">unit2</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(freight);
