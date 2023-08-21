import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Components/axios";
const initialState = {
  loading: false,
  errorL: null,
  successL: null,
};

export const login = createAsyncThunk("login/login", async (item, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const { data } = await axios.post("auth/login", {
      email: item.email,
      password: item.password,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk(
  "login/logout",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post("auth/logout");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetL: (state, action) => {
      state.successL = null;
      state.errorL = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.successL = null;
      state.errorL = null;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.errorL = null;
      state.loading = false;
      state.successL = action.payload.message;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errorL = action.payload.response.data.message;
      state.successL = null;
    });
  },
});
export default loginSlice.reducer;
export const { resetL } = loginSlice.actions;
