import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
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
  const [ modalState, setModalState ] = useState(0) // 0是创建
  const [ modalVisible , setModalVisible ] = useState(false)
  const [ form ] = Form.useForm();
  const handledeleteFreightPiece = async ({id}) => {
    await deleteFreightModel({
      shopId: depart_id,
      id
    })
  }
  const handleCreateFreightPiece = () => {
    setModalState(0)
    setModalVisible(true)
  }
  const handleModifyFreightPiece = (record) => {
    setModalState(1)
    setModalVisible(true)
    // 这里对time进行处理
    // form.setFieldsValue(record)
  }
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value)=>{
      await postDefineShopFreightPieceModel(value)
      setModalVisible(false)
    })
  }
  const handleSubmitModify = () => {
    form.validateFields().then(async (value)=>{
      await putModifyFreightModel(value)
      setModalVisible(false)
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
        title: '首件',
        dataIndex: 'firstItem',
        key: 'firstItem',
      },
      {
        title: '首件价格',
        dataIndex: 'firstItemPrice',
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
    ];
  }, []);
  useEffect(() => {
    getPieceItemsById({
      shopId: depart_id,
      page: freightPage,
      pageSize: freightPageSize
    });
    console.log("fetch new")
  }, [ ]);
  return (
    <Card>
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
          <Form.Item label="首件" name="firstItem" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="首件价格" name="firstItemPrice" required
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
