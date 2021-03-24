import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

interface freightModel {
  name: string;
  type: number;
  unit: number;
}
// 管理员定义店铺的运费模板
export const postDefineShopFreightModelReq = ({
  id,
  ...data
}: {
  id: number;
  data: freightModel;
}) => {
  return request(`/shops/${id}/freightmodels`, {
    method: 'post',
    data: data,
  });
};

// 获得店铺中商品的运费模板
export const getShopFreightModelReq = ({
  id,
  ...params
}: {
  id: number;
  params: any;
}) => {
  return request(`/shops/${id}/freightmodels`, {
    method: 'get',
    params: params,
  });
};

// 管理员克隆店铺的运费模板
export const postCloneShopFreightModelReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/clone`, {
    method: 'post',
  });
};

// 获得运费模板概要
export const getFreightModelByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}`);
};

// 管理员修改店铺的运费模板
export const putModifyFreightModelReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}`, {
    method: 'put',
    data: data,
  });
};

// 删除运费模板，需同步删除与商品的
export const deleteFreightModelReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}`, {
    method: 'delete',
  });
};

// 店家或管理员为商铺定义默认运费模板
export const postDefaultFreightModelReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/default`, {
    method: 'post',
  });
};

// 管理员定义重量模板明细
interface freightModelWeightInfo {
  firstWeight: number;
  firstWeightFreight: number;
  tenPrice: number;
  fiftyPrice: number;
  hundredPrice: number;
  trihunPrice: number;
  abovePrice: number;
  regionId: number;
}
export const postCreateWeightItemsReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: freightModelWeightInfo;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/weightItems`, {
    method: 'post',
    data: data,
  });
};
// 店家或管理员查询某个运费模板的明细
export const getWeightItemsByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/weightItems`);
};

// 管理员定义件数模板明细
interface freightModelPieceInfo {
  regionId: number;
  firstItem: number;
  firstItemPrice: number;
  additionalItems: number;
  additionalItemsPrice: number;
}
export const postCreatePieceItemsReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: freightModelPieceInfo;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/pieceItems`, {
    method: 'post',
    data: data,
  });
};

// 店家或管理员查询件数运费模板的明细
export const getPieceItemsByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/freightmodels/${id}/pieceItems`);
};

// 店家或管理员修改重量运费模板明细
export const putWeightItemsByIdReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: freightModelWeightInfo;
}) => {
  return request(`/shops/${shopId}/weightItems/${id}`, {
    method: 'put',
    data: data,
  });
};

// 店家或管理员删掉重量运费模板明细
export const deleteWeightItemsByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/weightItems/${id}`, {
    method: 'delete',
  });
};
// 店家或管理员修改件数运费模板明细
export const putPieceItemsByIdReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: freightModelPieceInfo;
}) => {
  return request(`/shops/${shopId}/pieceItems/${id}`, {
    method: 'put',
    data: data,
  });
};
// 店家或管理员删除件数运费模板明细
export const deletePieceItemsByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/pieceItems/${id}`, {
    method: 'delete',
  });
};
