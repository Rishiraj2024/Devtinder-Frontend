import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import feed1Reducer from "./feedSLilce"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
const appStore=configureStore({
reducer:{
user:userReducer,
feed1:feed1Reducer,
connection:connectionReducer,
request:requestReducer
}
})
export default appStore