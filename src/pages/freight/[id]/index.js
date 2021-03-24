import { useEffect } from 'react';
import { Card, Tabs, PageHeader, Switch, Button, Space } from 'antd';
import { connect, useParams, history } from 'umi';
import Piece from './piece';
import Weight from './weight';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Freight';
const { TabPane } = Tabs;
const freight_id = ({
  freightDetail,
  getFreightModelById, postDefaultFreightModel, 
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { name, type, unit, isDefault } = freightDetail;
  const { id } = useParams()
  const setDefaultModel = (value) => {
    console.log(value)
    postDefaultFreightModel()
  }
  useEffect(() => {
    getFreightModelById({
      depart_id,
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
        <Space>
          <span>模板名</span> <span>{name}</span>
          <span>unit</span> <span>{unit}</span>
          <span>type</span> <span>{type}</span>
        </Space>
        <Space>
          <span>是否是默认模板</span><Switch defaultChecked={isDefault} onChange={setDefaultModel}></Switch>
        </Space>
      </Card>
      <Card>
        <Tabs>
          <TabPane key="weight" tab="重量模板">
            <Weight></Weight>
          </TabPane>
          <TabPane key="piece" tab="件数模板">
            <Piece></Piece>
          </TabPane>
        </Tabs>
      </Card>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(freight_id);
