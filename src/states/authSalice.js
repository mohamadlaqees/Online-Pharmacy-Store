import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Components/axios";
const initialState = {
  errorA: null,
  successA: null,
  loadingA: false,
  userData: {},
  image: null,
  userId: null,
  email: "",
};
export const verify = createAsyncThunk(
  "auth/verify",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post("auth/email/verification-notification");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post("auth/forgot-password", {
        email: item.email,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post("auth/reset-password", {
        email: item.email,
        token: item.token,
        password: item.password,
        password_confirmation: item.passwordConfirm,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.get("/auth/user");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setFirstName = createAsyncThunk(
  "auth/setFirstName",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/first-name`, {
        firstName: item.firstName,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setLastName = createAsyncThunk(
  "auth/setLastName",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/last-name`, {
        lastName: item.lastName,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setGender = createAsyncThunk(
  "auth/setGender",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/gender`, {
        gender: item.gender,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setMobile = createAsyncThunk(
  "auth/setMobile",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/mobile`, {
        mobile: item.mobile,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setAddress = createAsyncThunk(
  "auth/setAddress",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/address-set`, {
        address: item.address,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setBirthDate = createAsyncThunk(
  "auth/setBirthDate",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(`users/date-of-birth`, {
        date: item.birthDate,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setImage = createAsyncThunk(
  "auth/setImage",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log(item.image);
      const { data } = await axios.post(
        `users/image`,
        {
          image: item.image,
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

export const getImage = createAsyncThunk(
  "auth/getImage",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.get(`users/${id}/image`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCSRF = createAsyncThunk("auth/getCSRF", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const { data } = await axios.get(
      "http://localhost:8000/sanctum/csrf-cookie"
    );
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.delete("users/delete");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetA: (state, action) => {
      state.successA = null;
      state.errorA = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verify.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(verify.rejected, (state, action) => {
      state.errorA = action.payload.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(getUserData.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.userData = action.payload;
      state.userId = action.payload.id;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.errorA = action.payload.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(forgetPassword.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.status;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.status;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setFirstName.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setFirstName.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setFirstName.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setLastName.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setLastName.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setLastName.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setGender.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setGender.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setGender.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setAddress.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setAddress.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setAddress.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setMobile.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setMobile.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setMobile.rejected, (state, action) => {
      state.errorA = action.payload.response?.data?.data?.mobile[0];
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setBirthDate.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setBirthDate.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setBirthDate.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(setImage.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(setImage.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
    });
    builder.addCase(setImage.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(getImage.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(getImage.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.image = action.payload.data;
    });
    builder.addCase(getImage.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });

    builder.addCase(deleteAccount.pending, (state, action) => {
      state.successA = null;
      state.errorA = null;
      state.loadingA = true;
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.errorA = null;
      state.loadingA = false;
      state.successA = action.payload.message;
      console.log(action);
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.errorA = action.payload.response.data.message;
      state.successA = null;
      state.loadingA = false;
    });
  },
});
export default authSlice.reducer;
export const { resetA, setEmail } = authSlice.actions;
