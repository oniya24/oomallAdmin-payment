import {
  getAllAdvertiseSegmentsReq,
  postCreateAdvertiseSegmentsReq,
  deleteAdvertiseSegmentsByIdReq,
  getAllFlashsaleSegmentsReq,
  deleteFlashsaleSegmentsReq,
  postCreateFlashsaleSegmentsReq,
} from '@/service/Time.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'time';
const model = {
  namespace,
  state: {
    adverSegList: [],
    adverSegTotal: 0,
    adverSegPage: 1,
    adverSegPageSize: 10,
    flashSegList: [],
    flashSegTotal: 0,
    flashSegPage: 1,
    flashSegPageSize: 10,
  },
  effects: {
    *getAllAdvertiseSegments({ payload }, { call, put }) {
      const res = yield call(getAllAdvertiseSegmentsReq, payload);
      const { data } = res;
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            adverSegList: list,
            adverSegTotal: total,
          },
        });
      }
    },
    *postCreateAdvertiseSegments({ payload }, { call, put }) {
      const res = yield call(postCreateAdvertiseSegmentsReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('创建成功');
      }
    },
    *deleteAdvertiseSegmentsById({ payload }, { call, put }) {
      const res = yield call(deleteAdvertiseSegmentsByIdReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('删除成功');
      }
    },
    *getAllFlashsaleSegments({ payload }, { call, put }) {
      const res = yield call(getAllFlashsaleSegmentsReq, payload);
      const { data } = res;
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            flashSegList: list,
            flashSegTotal: total,
          },
        });
      }
    },
    *deleteFlashsaleSegmentsById({ payload }, { call, put }) {
      const res = yield call(deleteFlashsaleSegmentsReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('删除成功');
      }
    },
    *postCreateFlashsaleSegments({ payload }, { call, put }) {
      const res = yield call(postCreateFlashsaleSegmentsReq, payload);
      if (isCodeEqualOk(res) || isErrnoEqual0(res)) {
        message.success('创建成功');
      }
    },
    *saveAdverPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          adverSegPage: page,
          adverSegPageSize: pageSize,
        },
      });
    },
    *saveFlashPagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          flashSegPage: page,
          flashSegPageSize: pageSize,
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
