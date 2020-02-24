

const wangEditor = {
  namespace:'wangEditor',
  state:{
    reactAceContent:''
  },
  effects:{

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
export default wangEditor