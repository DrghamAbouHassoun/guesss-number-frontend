import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  username: string;
  body: string;
  createdAt: string
}

interface InitialState {
  messages: Message[];
}

const initialState : InitialState = {
  messages: [],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    appendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    resetChat: (state) => {
      state.messages = [];
    }
  }
})

export const { appendMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;