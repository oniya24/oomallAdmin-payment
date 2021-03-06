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
    freightList: [],
    freightTotal: 0,
    freightPage: 1,
    freightPageSize: 10,
    freightDetail: {
      id: 0,
      name: '',
      type: 0,
      unit: 0,
      isDefault: true,
      gmtCreate: '',
      gmtModified: '',
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
        message.success('εε»Ίζε');
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
    *getFreightModelById({ payload }, { call, put }) {
      const res = yield call(getFreightModelByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            freightDetail: data,
          },
        });
      }
    },
    *postDefaultFreightModel({ payload }, { call, put }) {
      const res = yield call(postDefaultFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('ζδ½ζε');
      }
    },
    *putModifyFreightModel({ payload }, { call, put }) {
      const res = yield call(putModifyFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('δΏ?ζΉζε');
      }
    },
    *deleteFreightModel({ payload }, { call, put }) {
      const res = yield call(deleteFreightModelReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('ε ι€ζε');
      }
    },
    *postCreateWeightItems({ payload }, { call, put }) {
      const res = yield call(postCreateWeightItemsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('εε»Ίζε');
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
            freightWeightTotal: data.length,
          },
        });
      }
    },
    *putWeightItemsById({ payload }, { call, put }) {
      const res = yield call(putWeightItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('δΏ?ζΉζε');
      }
    },
    *deleteWeightItemsById({ payload }, { call, put }) {
      const res = yield call(deleteWeightItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('ε ι€ζε');
      }
    },
    *postCreatePieceItems({ payload }, { call, put }) {
      console.log('payload', payload);
      const res = yield call(postCreatePieceItemsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('εε»Ίζε');
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
            freightPieceTotal: data.length,
          },
        });
      }
    },
    *putPieceItemsById({ payload }, { call, put }) {
      const res = yield call(putPieceItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('δΏ?ζΉζε');
      }
    },
    *deletePieceItemsById({ payload }, { call, put }) {
      const res = yield call(deletePieceItemsByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('ε ι€ζε');
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
