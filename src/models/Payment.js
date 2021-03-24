import {
  getOrderPayInfoReq,
  getOrderRefundInfoReq,
  getAftersalePayInfoReq,
  getAftersaleRefundInfoReq,
  postCreatePaymentInfoReq,
} from '@/service/Payment.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'payment';
const model = {
  namespace,
  state: {
    orderPay: {
      id: 0,
      orderId: 0,
      aftersaleId: 0,
      amount: 0,
      actualAmount: 0,
      payTime: 'string',
      paymentPattern: 'string',
      state: 0,
      beginTime: 'string',
      endTime: 'string',
      gmtCreate: 'string',
      gmtModified: 'string',
    },
    orderRefund: {
      id: 0,
      paymentId: 0,
      amount: 0,
      state: 0,
      gmtCreate: 'string',
      gmtModified: 'string',
      orderId: 0,
      aftersaleId: 0,
    },
    aftersalePay: {
      id: 0,
      orderId: 0,
      aftersaleId: 0,
      amount: 0,
      actualAmount: 0,
      payTime: 'string',
      paymentPattern: 'string',
      state: 0,
      beginTime: 'string',
      endTime: 'string',
      gmtCreate: 'string',
      gmtModified: 'string',
    },
    aftersaleRefund: {
      id: 0,
      paymentId: 0,
      amount: 0,
      state: 0,
      gmtCreate: 'string',
      gmtModified: 'string',
      orderId: 0,
      aftersaleId: 0,
    },
  },
  effects: {
    *getOrderPayInfo({ payload }, { call, put }) {
      const res = yield call(getOrderPayInfoReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            orderPay: data,
          },
        });
      }
    },
    *getOrderRefundInfo({ payload }, { call, put }) {
      const res = yield call(getOrderRefundInfoReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            orderRefund: data,
          },
        });
      }
    },
    *getAftersalePayInfo({ payload }, { call, put }) {
      const res = yield call(getAftersalePayInfoReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            aftersalePay: data,
          },
        });
      }
    },
    *getAftersaleRefundInfo({ payload }, { call, put }) {
      const res = yield call(getAftersaleRefundInfoReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            aftersaleRefund: data,
          },
        });
      }
    },
    *postCreatePaymentInfo({ payload }, { call, put }) {
      const res = yield call(postCreatePaymentInfoReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
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
