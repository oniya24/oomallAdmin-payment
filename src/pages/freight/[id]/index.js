import { useEffect } from 'react';
import { Card, Tabs, PageHeader, Switch, Button, Space } from 'antd';
import { connect, useParams, history } from 'umi';
import Piece from './piece';
import Weight from './weight';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Freight';
import { freightModel } from '@/const/oomall'

const { TabPane } = Tabs;
const freight_id = ({
  freightDetail,
  getFreightModelById, 
  postDefaultFreightModel, 
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { name, type, unit, isDefault } = freightDetail;
  const { id } = useParams()
  const setDefaultModel = async (value) => {
    console.log(value)
    await postDefaultFreightModel({
      id: id,
      shopId: depart_id
    })
    await getFreightModelById({
      shopId: depart_id,
      id
    })
  }
  useEffect(() => {
    getFreightModelById({
      shopId: depart_id,
      id
    })
  }, [])
  return (
    <Card style={{ height: '100%', width: '100%' }}
      bodyStyle={{ padding: 10}}
      title={
        <PageHeader subTitle="返回列表页" 
        style={{padding: 0}}
        onBack={() => history.goBack() }
        />
      }
    >
      <Card style={{margin: 0}} >
        <div>
          <Space>
            <span>模板名: </span> <span>{name}</span>
            <span>计重单位g: </span> <span>{unit}</span>
            <span>模板类型: </span> <span>{freightModel[type]}</span>
          </Space>
        </div>
        <div>
          <span>是否是默认模板: </span><Switch defaultChecked={isDefault} onChange={setDefaultModel}></Switch>
        </div>
      </Card>
      {
        Number(type) === 0 && (
          <Weight></Weight>
        )
      }
      {
        Number(type) === 1 && (
          <Piece></Piece>
        )
      }
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(freight_id);
