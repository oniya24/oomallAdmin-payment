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
    adverSegList: [
      {
        id: 0,
        beginTime: 'string',
        endTime: 'string',
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    adverSegTotal: 0,
    adverSegPage: 1,
    adverSegPageSize: 10,
    flashSegList: [
      {
        id: 0,
        beginTime: 'string',
        endTime: 'string',
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
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
    },
    *deleteAdvertiseSegmentsById({ payload }, { call, put }) {
      const res = yield call(deleteAdvertiseSegmentsByIdReq, payload);
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
    *deleteFlashsaleSegments({ payload }, { call, put }) {
      const res = yield call(deleteFlashsaleSegmentsReq, payload);
    },
    *postCreateFlashsaleSegments({ payload }, { call, put }) {
      const res = yield call(postCreateFlashsaleSegmentsReq, payload);
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
