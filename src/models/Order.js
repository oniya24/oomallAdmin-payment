import {
  getAllOrderReq,
  getOrderByIdReq,
  putModifyOrderReq,
  deleteOrderByIdReq,
  putDeliverOrderReq,
} from '@/service/Order.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'order';
const model = {
  namespace,
  state: {
    orderList: [
      {
        id: 0,
        customerId: 0,
        shopId: 0,
        pid: 0,
        orderType: 0,
        state: 0,
        subState: 0,
        gmtCreate: 0,
        originPrice: 0,
        discountPrice: 0,
        freightPrice: 0,
        grouponId: 0,
        presaleId: 0,
        shipmentSn: 'string',
      },
    ],
    orderTotal: 0,
    orderPage: 1,
    orderPageSize: 10,
    orderDetail: {
      id: 0,
      orderSn: 'string',
      customer: {
        id: 0,
        userName: 'string',
        name: 'string',
      },
      shop: {
        id: 0,
        name: 'string',
        state: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
      pid: 0,
      orderType: 0,
      state: 0,
      subState: 0,
      gmtCreate: 'string',
      gmtModified: 'string',
      confirmTime: 'string',
      originPrice: 0,
      discountPrice: 0,
      freightPrice: 0,
      rebateNum: 0,
      message: 'string',
      regionId: 0,
      address: 'string',
      mobile: 'string',
      consignee: 'string',
      couponId: 0,
      grouponId: 0,
      presaleId: 0,
      shipmentSn: 'string',
      orderItems: [
        {
          skuId: 0,
          orderId: 0,
          name: 'string',
          quantity: 0,
          price: 0,
          discount: 0,
          couponActId: 0,
          beSharedId: 0,
        },
      ],
    },
  },
  effects: {
    *getAllOrder({ payload }, { call, put }) {
      const res = yield call(getAllOrderReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            orderTotal: total,
            orderList: list,
          },
        });
      }
    },
    *getOrderById({ payload }, { call, put }) {
      const res = yield call(getOrderByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            orderDetail: data,
          },
        });
      }
    },
    *putModifyOrder({ payload }, { call, put }) {
      const res = yield call(putModifyOrderReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        message.success('修改成功');
      }
    },
    *deleteOrderById({ payload }, { call, put }) {
      const res = yield call(deleteOrderByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        message.success('删除成功');
      }
    },
    *putDeliverOrder({ payload }, { call, put }) {
      const res = yield call(putDeliverOrder, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        message.success('确认收货成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          orderPage: page,
          orderPageSize: pageSize,
        },
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
