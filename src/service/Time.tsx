import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员获取广告时间段列表
export const getAllAdvertiseSegmentsReq = ({
  did,
  ...params
}: {
  did: number;
  params: pagination;
}) => {
  return request(`/shops/${did}/advertisement/timesegments`, {
    params: params,
  });
};

// 平台管理员新增广告时间段
export const postCreateAdvertiseSegmentsReq = ({
  did,
  ...data
}: {
  did: number;
  data: pagination;
}) => {
  return request(`/shops/${did}/advertisement/timesegments`, {
    method: 'post',
    data: data,
  });
};

// 平台管理员删除广告时间段
export const deleteAdvertiseSegmentsByIdReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/timesegments/${id}`, {
    method: 'delete',
  });
};

// 管理员获取秒杀时间段列表
export const getAllFlashsaleSegmentsReq = ({
  did,
  ...params
}: {
  did: number;
  params: pagination;
}) => {
  return request(`/shops/${did}/flashsale/timesegments`, {
    params: params,
  });
};

// 管理员删除秒杀时间段列表
export const deleteFlashsaleSegmentsReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/timesegments/${id}`, {
    method: 'delete',
  });
};

export const postCreateFlashsaleSegmentsReq = ({
  did,
  ...data
}: {
  did: number;
  data: pagination;
}) => {
  return request(`/shops/${did}/flashsale/timesegments`, {
    method: 'post',
    data: data,
  });
};
