

const codeEditor = {
  namespace:'codeEditor',
  state:{
    reactAceContent:'',
    customeMode:'javascript',
    customeTheme:'monokai',
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
export default codeEditor