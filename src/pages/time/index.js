import { Card, Tabs } from 'antd';
import AdverTime from './advertise';
import FlashTime from './flashSale';
const { TabPane } = Tabs;
const adminManage = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="adverTime" tab="广告时间段">
          <AdverTime></AdverTime>
        </TabPane>
        <TabPane key="flashTime" tab="秒杀时间段">
          <FlashTime></FlashTime>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default adminManage;
