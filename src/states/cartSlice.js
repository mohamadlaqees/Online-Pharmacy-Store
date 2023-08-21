import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Components/axios";
import { addIdLocal, removeIdLocal } from "../utils/IdLocalStrage";

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const url = `/orders/cart/store/${item.productId}?quantity=${item.quantity}`;
    try {
      const { data } = await axios.post(url);
      console.log(data);
      return item.productId;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
        productId: item.productId,
      });
    }
  }
);
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const url = `/orders/cart/${item.userId}/remove/${item.productId}`;
    try {
      const { data } = await axios.delete(url);
      console.log(data);
      return item.productId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const url = `/orders/cart/${item.userId}/quantity/update/${item.productId}?quantity=${item.quantity}`;
    try {
      const { data } = await axios.put(url);
      console.log(data);
      return item.quantity;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkOut= createAsyncThunk(
  "cart/checkOut",
  async (item,thunkApi)=>{
    const {rejectWithValue}=thunkApi;
      try{
        const response=await axios.post(`orders/cart/${item.userId}/checkout?address=${item.address}`)
        console.log(response.data)
        return response.data.message
      }catch(error){
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message)
      }
  }
)

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartLoading:false,
    cartError: null,
    cartSuccess: null,
    selectedIds: [],
  },
  reducers: {
    resetC: (state, action) => {
      state.cartSuccess = null;
      state.cartError = null;
      state.cartLoading=null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.selectedIds.push(parseInt(action.payload));
      state.cartSuccess = "Item added to cart successfully!";
      state.cartError = null;
      addIdLocal(action.payload);
    });
    builder.addCase(addItem.pending,(state,action)=>{
      state.cartLoading=true
      state.cartError = null;
      state.cartSuccess = null;
    })
    builder.addCase(addItem.rejected, (state, action) => {
      if (action.payload.status === 422) {
        state.selectedIds.push(parseInt(action.payload.productId));
        addIdLocal(action.payload.productId);
      }
      state.cartError = action.payload.message;
      state.cartSuccess = null;
    });

    builder.addCase(removeItem.fulfilled, (state, action) => {
      const idToRemove = parseInt(action.payload);
      removeIdLocal(parseInt(idToRemove));
      state.selectedIds = state.selectedIds.filter((id) => id !== idToRemove);
      state.cartSuccess = "Item removed successfully";
      state.cartError = null;
      state.cartLoading = false;
    });
    builder.addCase(removeItem.rejected, (state, action) => {
      state.cartError = "Item was not removed successfully";
      state.cartSuccess = null;
      state.cartLoading = false;

    });
    builder.addCase(removeItem.pending,(state,action)=>{
      state.cartLoading=true
      state.cartError = null;
      state.cartSuccess = null;
    })
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.cartSuccess = `updated product quantity to ${action.payload}`;
      state.cartError = null;
      state.cartLoading = false;

    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.cartError = action.payload;
      state.cartLoading = false;

    });
    builder.addCase(checkOut.rejected,(state,action)=>{
      state.cartError = action.payload;
      state.cartLoading = false;
    })
    builder.addCase(checkOut.pending,(state,action)=>{
      state.cartLoading = true;
      state.cartError=null;
      state.cartSuccess=null;
    })
    builder.addCase(checkOut.fulfilled,(state,action)=>{
      localStorage.removeItem("Ids");
      state.cartError=null
      state.cartSuccess=action.payload
      state.cartLoading=null

    })
  },
});

export default cartSlice.reducer;
export const { resetC } = cartSlice.actions;
