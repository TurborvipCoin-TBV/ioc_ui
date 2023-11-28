import { ethers } from "ethers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWalletInfo } from "app/src/_types_";

export interface AccountState {
    wallet?:IWalletInfo,
    wed3Provider?:ethers.providers.Web3Provider;
}

const initialState:AccountState ={}

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        setWeb3Provider:(state,action:PayloadAction<ethers.providers.Web3Provider>) =>{
            state.wed3Provider = action.payload;
        },
        setWalletInfo:(state,action:PayloadAction<IWalletInfo>) =>{
            state.wallet = action.payload;
        }
    }
})

export const {setWalletInfo, setWeb3Provider} =accountSlice.actions;
export default accountSlice.reducer;