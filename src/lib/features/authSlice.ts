import decodeToken from "@/helpers/decodeToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

interface IUser {
  name: string;
  email: string;
  _id: string;
}

interface InitialState {
  status: "authenticated" | "unauthenticated";
  user: IUser;
  token: string;
}

const initialState: InitialState = {
  status: "unauthenticated",
  user: {
    name: "",
    email: "",
    _id: "",
  },
  token: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    handleAuthenticate: (state: InitialState, action: PayloadAction<{ token: string }>) => {
      // state.user = action.payload;
      const tokenPayload: JwtPayload | IUser = decodeToken(action.payload.token);
      state.user = tokenPayload as IUser;
      state.token = action.payload.token;
      state.status = "authenticated";
    },
    handleLogout: (state: InitialState) => {
      state.user = initialState.user;
      state.status = "unauthenticated";
    }
  },
})

export const { 
  handleAuthenticate,
  handleLogout,
} = authSlice.actions;

export default authSlice.reducer;