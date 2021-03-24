import {
  postDefineShopFreightModelReq,
  getShopFreightModelReq,
  putModifyFreightModelReq,
  deleteFreightModelReq,
  getFreightModelByIdReq,
  postDefaultFreightModelReq,
  postCreateWeightItemsReq,
  getWeightItemsByIdReq,
  putWeightItemsByIdReq,
  deleteWeightItemsByIdReq,
  postCreatePieceItemsReq,
  getPieceItemsByIdReq,
  putPieceItemsByIdReq,
  deletePieceItemsByIdReq,
} from '@/service/Freight.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'freight';
const model = {
  namespace,
  state: {
    freightList: [
      {
        id: 0,
        name: 'string',
        type: 0,
        unit: 0,
        default: true,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    freightTotal: 0,
    freightPage: 1,
    freightPageSize: 10,
    freightDetail: {
      id: 0,
      name: 'string',
      type: 0,
      unit: 0,
      isDefault: true,
      gmtCreate: 'string',
      gmtModified: 'string',
    },
    freightWeightList: [
      {
        id: 0,
        firstWeight: 0,
        firstWeightFreight: 0,
        tenPrice: 0,
        fiftyPrice: 0,
        hundredPrice: 0,
        trihunPrice: 0,
        abovePrice: 0,
        regionId: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    freightWeightTotal: 0,
    freightPieceList: [
      {
        id: 0,
        regionId: 0,
        firstItem: 0,
        firstItemPrice: 0,
        additionalItems: 0,
        additionalItemsPrice: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    freightPieceTotal: 0,
  },
  effects: {
    *postDefineShopFreightModel({ payload }, { call, put }) {
      const res = yield call(postDefineShopFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *getShopFreightModel({ payload }, { call, put }) {
      const res = yield call(getShopFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            freightList: list,
            freightTotal: total,
          },
        });
      }
    },
    *putModifyFreightModel({ payload }, { call, put }) {
      const res = yield call(putModifyFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteFreightModel({ payload }, { call, put }) {
      const res = yield call(deleteFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postCreateWeightItems({ payload }, { call, put }) {
      const res = yield call(postCreateWeightItemsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *getWeightItemsById({ payload }, { call, put }) {
      const res = yield call(getWeightItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            freightWeightList: data,
          },
        });
      }
    },
    *putWeightItemsById({ payload }, { call, put }) {
      const res = yield call(putWeightItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteWeightItemsById({ payload }, { call, put }) {
      const res = yield call(deleteWeightItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *postCreatePieceItems({ payload }, { call, put }) {
      const res = yield call(postCreatePieceItemsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *getPieceItemsById({ payload }, { call, put }) {
      const res = yield call(getPieceItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            freightPieceList: data,
          },
        });
      }
    },
    *putPieceItemsById({ payload }, { call, put }) {
      const res = yield call(putPieceItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deletePieceItemsById({ payload }, { call, put }) {
      const res = yield call(deletePieceItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {},
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export const mapStateToProps = defaultMapStateToProps(model);
export const mapDispatchToProps = defaultMapDispatchToProps(model);
export default model;
