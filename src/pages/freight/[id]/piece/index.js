import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history, useParams } from 'umi';
import { Card, Table, Button, Tooltip, Space, Form, DatePicker, Modal, Input, Select } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Freight';
import pagination from '@/utils/pagination';
const { Option } = Select;
const freight_piece = ({ freightPieceList, freightPieceTotal,
  postCreatePieceItems, getPieceItemsById, putPieceItemsById, deletePieceItemsById,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { id: freightId } = useParams()
  console.log("fright",freightId, useParams())
  const [ modalState, setModalState ] = useState(0) // 0是创建
  const [ modalVisible , setModalVisible ] = useState(false)
  const [ form ] = Form.useForm();
  const handledeleteFreightPiece = async ({id}) => {
    await deletePieceItemsById({
      shopId: depart_id,
      id: id
    })
    await getPieceItemsById({
      shopId: depart_id,
      id: freightId,
    });
  }
  const handleCreateFreightPiece = () => {
    setModalState(0)
    setModalVisible(true)
    form.resetFields()
  }
  const handleModifyFreightPiece = (record) => {
    setModalState(1)
    setModalVisible(true)
    // 这里对time进行处理
    form.setFieldsValue(record)
  }
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value)=>{
      await postCreatePieceItems({
        ...value,
        shopId: depart_id,
        id: freightId,
      })
      setModalVisible(false)
      await getPieceItemsById({
        shopId: depart_id,
        id: freightId,
      });
    })
  }
  const handleSubmitModify = () => {
    form.validateFields().then(async (value)=>{
      await putPieceItemsById({
        ...value,
        shopId: depart_id,
      })
      setModalVisible(false)
      await getPieceItemsById({
        shopId: depart_id,
        id: freightId,
      });
    })
  }
  const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '首件',
        dataIndex: 'firstItems',
        key: 'firstItem',
      },
      {
        title: '首件价格',
        dataIndex: 'firstItemsPrice',
        key: 'firstItemPrice',
      },
      {
        title: '额外件数',
        dataIndex: 'additionalItems',
        key: 'additionalItems'
      },
      {
        title: '额外价格',
        dataIndex: 'additionalItemsPrice',
        key: 'additionalItemsPrice'
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
              <Button type="primary" onClick={() => handleModifyFreightPiece(record)}>
                修改模板
              </Button>
              <Button type="danger" onClick={() => handledeleteFreightPiece(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ]
  useEffect(() => {
    getPieceItemsById({
      shopId: depart_id,
      id: freightId,
    });
  }, [ ]);
  return (
    <Card title="件数模板">
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateFreightPiece}>创建运费模板</Button>
      </div>
      <Table
        scroll={{ x: true }}
        // pagination={pagination(freightTotal, savePagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={freightPieceList}
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
          <Form.Item label="首件" name="firstItems" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="首件价格" name="firstItemsPrice" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="额外件数" name="additionalItems" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="额外价格" name="additionalItemsPrice" required
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

export default connect(mapStateToProps, mapDispatchToProps)(freight_piece);
