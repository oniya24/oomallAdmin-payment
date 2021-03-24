import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 店家查询商户所有订单 (概要)
export const getAllOrderReq = ({
  shopId,
  ...params
}: {
  shopId: number;
  params: any;
}) => {
  return request(`/shops/${shopId}/orders`, {
    method: 'get',
    params: params,
  });
};

// 店家查询店内订单完整信息（普通，团购，预售）
export const getOrderByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/orders/${id}`);
};

// 店家修改订单 (留言)
export const putModifyOrderReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/orders/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员取消本店铺订单
export const deleteOrderByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/orders/${id}`);
};

// 店家对订单标记发货
export const putDeliverOrderReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/orders/${id}`, {
    method: 'put',
    data: data,
  });
};
