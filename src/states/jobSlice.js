import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Components/axios";
const initialState = {
  loading: false,
  errorJ: null,
  successJ: null,
};

export const applyJob = createAsyncThunk(
  "job/applyJob",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(
        `applicants/store?first_name=${item.fName}&last_name=${item.lName}&address=${item.address}&email=${item.email}&mobile=${item.mobile}&vacancy=${item.type}&date_of_birth=${item.date}&gender=${item.gender}&resume=`,
        {
          resume: item.resume,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    resetJ: (state, action) => {
      state.successJ = null;
      state.errorJ = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applyJob.pending, (state, action) => {
      state.successJ = null;
      state.errorJ = null;
      state.loading = true;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.errorJ = null;
      state.loading = false;
      state.successJ = action.payload.message;
    });
    builder.addCase(applyJob.rejected, (state, action) => {
      state.errorJ = action.payload.response.data.message;
      state.successJ = null;
    });
  },
});
export default jobSlice.reducer;
export const { resetJ } = jobSlice.actions;
