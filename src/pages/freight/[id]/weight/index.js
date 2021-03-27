import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history, useParams } from 'umi';
import { Card, Table, Button, Tooltip, Space, Form, DatePicker, Modal, Input, Select } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Freight';
import pagination from '@/utils/pagination';
const { Option } = Select;
const freight_weight = ({ freightWeightList, freightWeightTotal,
  postCreateWeightItems, getWeightItemsById, putWeightItemsById, deleteWeightItemsById,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { id: freightId } = useParams()
  const [ modalState, setModalState ] = useState(0) // 0是创建
  const [ modalVisible , setModalVisible ] = useState(false)
  const [ form ] = Form.useForm();
  const handledeleteFreightWeight = async ({id}) => {
    await deleteWeightItemsById({
      shopId: depart_id,
      id: id
    })
    await getWeightItemsById({
      shopId: depart_id,
      id: freightId
    });
  }
  const handleCreateFreightWeight = () => {
    setModalState(0)
    setModalVisible(true)
    form.resetFields()
  }
  const handleModifyFreightWeight = (record) => {
    setModalState(1)
    setModalVisible(true)
    // 这里对time进行处理
    form.setFieldsValue(record)
  }
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value)=>{
      await postCreateWeightItems({ 
        ...value,
        shopId: depart_id,
        id: freightId,
      })
      setModalVisible(false)
      await getWeightItemsById({
        shopId: depart_id,
        id: freightId
      });
    })
  }
  const handleSubmitModify = () => {
    form.validateFields().then(async (value)=>{
      await putWeightItemsById({ 
        ...value,
        shopId: depart_id,
      })
      setModalVisible(false)
      await getWeightItemsById({
        shopId: depart_id,
        id: freightId
      });
    })
  }
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'firstWeight',
        dataIndex: 'firstWeight',
        key: 'firstWeight',
      },
      {
        title: 'firstWeightFreight',
        dataIndex: 'firstWeightFreight',
        key: 'firstWeightFreight',
      },
      {
        title: 'tenPrice',
        dataIndex: 'tenPrice',
        key: 'tenPrice'
      },
      {
        title: 'hundredPrice',
        dataIndex: 'hundredPrice',
        key: 'hundredPrice'
      },
      {
        title: 'trihunPrice',
        dataIndex: 'trihunPrice',
        key: 'trihunPrice'
      },
      {
        title: 'abovePrice',
        dataIndex: 'abovePrice',
        key: 'abovePrice'
      },
      {
        title: 'regionId',
        dataIndex: 'regionId',
        key: 'regionId'
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreated',
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
          const { id } = record
          return (
            <Space>
              <Button type="primary" onClick={() => handleModifyFreightWeight(record)}>
                修改模板
              </Button>
              <Button type="danger" onClick={() => handledeleteFreightWeight(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getWeightItemsById({
      shopId: depart_id,
      id: freightId
    });
  }, [ ]);
  return (
    <Card title="重量模板">
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateFreightWeight}>创建运费模板</Button>
      </div>
      <Table
        scroll={{ x: true }}
        // pagination={pagination(freightTotal, savePagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={freightWeightList}
      ></Table>
      <Modal 
        visible={modalVisible}
        destroyOnClose okText="确定" cancelText="取消"
        onOk={() => Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify() } 
        onCancel={()=>setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden>
          </Form.Item>
          <Form.Item label="firstWeight" name="firstWeight" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="firstWeightFreight" name="firstWeightFreight" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="tenPrice" name="tenPrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="fiftyPrice" name="fiftyPrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="hundredPrice" name="hundredPrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="trihunPrice" name="trihunPrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="abovePrice" name="abovePrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="regionId" name="regionId" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(freight_weight);
