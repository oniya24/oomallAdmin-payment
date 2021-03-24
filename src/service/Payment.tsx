import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查询订单的支付信息
export const getOrderPayInfoReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/orders/${id}/payments`);
};

// 管理员查询售后单的支付信息
export const getAftersalePayInfoReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}/payments`);
};

// 管理员查询订单的退款信息
export const getOrderRefundInfoReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/orders/${id}/refunds`);
};

// 管理员查询订单的退款信息
export const getAftersaleRefundInfoReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}/refunds`);
};

// 管理员创建退款信息，需检查Payment是否是此商铺
export const postCreatePaymentInfoReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/payments/${id}/refunds`, {
    method: 'post',
  });
};
