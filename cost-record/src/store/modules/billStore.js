//账单列表相关store
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    //数据状态state
    name: 'bill',
    initialState:{
        billList: []
    },
    reducers:{
        //同步修改法
        setBillList(state, action){
            state.billList = action.payload
        }
    }
})

//结构actionCreater函数
const {setBillList} = billStore.actions

//编写异步
const getBillList = () => {
    return async (dispatch) => {
            //编写异步请求
            const res = await axios.get('http://localhost:8888/ka')
            //触发同步reducer
            dispatch(setBillList(res.data))
    }
}

export { getBillList }
//到处reducer
const reducer = billStore.reducer


export default reducer