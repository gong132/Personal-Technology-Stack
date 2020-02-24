import {
  queryAnimationList,
} from '@/services/moment'

import _ from 'lodash'

const dateResolve = {
  namespace:'dateResolve',
  state:{
    animationList:[]
  },
  effects:{

    // 查询列表数据
    *queryList({payload},{call,put}) {
      const response = yield call(queryAnimationList,payload)
      yield put({
        type:'setState',
        payload:{animationList:response}
      })
    },

    // 编辑数据
    *editList({payload},{call,put,select}) {
      console.log(payload)
      const state = yield select(_=>_.dateResolve)
      const { animationList } = state
      _.assign(animationList[payload.index],payload)
      yield put({
        type:'setState',
        payload:{animationList}
      })
    }

  },
  reducers:{
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
export default dateResolve