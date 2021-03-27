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
import { freightModel } from '@/const/oomall';
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
    await getShopFreightModel({
      shopId: depart_id,
      page: freightPage,
      pageSize: freightPageSize,
    });
  };
  const handleCreateFreight = () => {
    setModalState(0);
    setModalVisible(true);
    form.resetFields();
  };
  const handleModifyFreight = record => {
    setModalState(1);
    setModalVisible(true);
    form.setFieldsValue(record);
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async value => {
      // const { unit, ...tail } = value
      await postDefineShopFreightModel({
        shopId: depart_id,
        // unit: Number(unit),
        // ...tail
        ...value,
      });
      setModalVisible(false);
      await getShopFreightModel({
        shopId: depart_id,
        page: freightPage,
        pageSize: freightPageSize,
      });
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async value => {
      await putModifyFreightModel({
        shopId: depart_id,
        ...value,
      });
      setModalVisible(false);
      await getShopFreightModel({
        shopId: depart_id,
        page: freightPage,
        pageSize: freightPageSize,
      });
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
        title: '运费模板名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '运费类型',
        dataIndex: 'type',
        key: 'type',
        render: text => freightModel[text],
      },
      {
        title: '计重单位g',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '是否是默认',
        dataIndex: 'defaultModel',
        key: 'defaultModel',
        render: text => (Number(text) === 0 ? '非默认' : '默认模板'),
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreated',
        key: 'gmtCreated',
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
                修改模板
              </Button>
              <Button
                type="default"
                onClick={() => history.push(`/freight/${id}`)}
              >
                查看详情
              </Button>
              <Button type="danger" onClick={() => handledeleteFreight(record)}>
                删除模板
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getShopFreightModel({
      shopId: depart_id,
      page: freightPage,
      pageSize: freightPageSize,
    });
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
            label="运费模板名"
            name="name"
            required
            rules={[{ required: true, message: '请输入模板名' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) === 0 ? (
            <Form.Item
              label="运费模板类型"
              name="type"
              required
              rules={[{ required: true, message: '请输入运费模板类型' }]}
            >
              <Select>
                {Object.keys(freightModel).map(key => {
                  return (
                    <Option value={Number(key)}>{freightModel[key]}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            label="计重单位g"
            name="unit"
            required
            rules={[{ required: true, message: '请输入计重单位g' }]}
          >
            <Input type="number"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(freight);
