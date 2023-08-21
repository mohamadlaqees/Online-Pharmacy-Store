import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Components/axios";
import {
  addProductToOrder,
  deleteProductFromCurrentOrder,
} from "../utils/Orderutil";

// fetch the page ("http://localhost:8000/api/orders/customers/106?page=1"  , userId)

export const fetchOrderPage = createAsyncThunk(
  "fetchOrderPage",
  async (item, { rejectWithValue }) => {
    try {
      var resp;
      if (item.status !== "ALL" && item.date !== "") {
        resp = await axios.get(
          `/orders/customers/${item.userID}?page=${item.PageNumber}&date=${item.date}&status=${item.staus}`
        );
      } else if (item.status !== "ALL" && item.date === "") {
        console.log(
          `/orders/customers/${item.userID}?page=${item.PageNumber}&status=${item.status}`
        );
        resp = await axios.get(
          `/orders/customers/${item.userID}?page=${item.PageNumber}&status=${item.status}`
        );
        console.log("response", resp);
      } else if (item.status === "ALL" && item.date !== "") {
        resp = await axios.get(
          `/orders/customers/${item.userID}?page=${item.PageNumber}&date=${item.date}`
        );
      } else {
        resp = await axios.get(
          `/orders/customers/${item.userID}?page=${item.PageNumber}`
        );
      }
      console.log("resp", resp);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const UpdateQuantityInOrder = createAsyncThunk(
  "UpdateQuantityInOrder",
  async ({ orderId, productId, quantity }, { rejectWithValue }) => {
    try {
      await axios.put(
        `/orders/online-orders/update/${orderId}/${productId}?quantity=${quantity}`
      );
      return quantity;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//delete online order
export const deleteOnlineOrder = createAsyncThunk(
  "deleteOnlineOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`/orders/online-orders/delete/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const addItemToCurrentOrder = createAsyncThunk(
  "addItemToCurrentOrder",
  async ({ orderId, productId }, { rejectWithValue }) => {
    console.log("orderId", orderId);
    try {
      await axios.post(
        `/orders/online-orders/store/${orderId}/${productId}/?quantity=1`
      );
      return { orderId: orderId, productId: productId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteItemFromOrder = createAsyncThunk(
  "deleteItemFromOrder",
  async ({ orderId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `/orders/online-orders/remove/${orderId}/${productId}`
      );
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//updateAddress
export const updateAddress = createAsyncThunk(
  "updateAddress",
  async ({ address, orderId }, { rejectWithValue }) => {
    try {
      await axios.put(
        `/orders/online-orders/shipping-address/store/${orderId}?address=${address}`
      );
      // return productId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const checkout = createAsyncThunk(
  "checkout",
  async ({ address, orderId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `/orders/online-orders/checkout/${orderId}?address=${address}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orderLoading: false,
    orderError: null,
    orderSuccess: null,
    checkout:null,
    orders: [],
    total: 10,
  },
  reducers: {
    resetO: (state, action) => {
      state.orderSuccess = null;
      state.orderError = null;
      state.orderLoading = null;
      state.checkout=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderPage.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.total = action.payload.meta.total;
        state.orderLoading = false;
        state.orderError=null
      })
      .addCase(fetchOrderPage.pending, (state, action) => {
        state.orders = [];
        state.orderLoading = true;
        state.orderError=null
      })
      .addCase(fetchOrderPage.rejected, (state, action) => {
        state.orders = [];
        state.orderLoading = false;
        state.orderError = true;
      });
      //checkout
      builder
      .addCase(checkout.fulfilled, (state, action) => {
        // state.orders = action.payload.data;
        // state.total = action.payload.meta.total;
state.checkout=true
      })
      .addCase(checkout.pending, (state, action) => {
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkout=false
        // state.orderError = "your orders contains prescription drugs please upload image ";
      });
    // update quantity of a product in an order
    builder
      .addCase(UpdateQuantityInOrder.fulfilled, (state, action) => {
        state.orderError = null;
        state.orderSuccess = `updated quantity of product to ${action.payload}`;
      })
      .addCase(UpdateQuantityInOrder.pending, (state, _) => {
        state.itemLoading = true;
        state.orderError = null;
        state.orderSuccess = null;
      })
      .addCase(UpdateQuantityInOrder.rejected, (state, _) => {
        state.orderSuccess = null;
        state.itemLoading = false;
        state.orderError = "Unable to update the quantity of this product";
      });
    // delete onine order
    builder
      .addCase(deleteOnlineOrder.fulfilled, (state, action) => {
        //  removeOrder(action.payload); //action.payload is the order id to delete form local storage
        state.orderError = false;
        state.orderLoading = false;
        state.total -= 1;
      })
      .addCase(deleteOnlineOrder.pending, (state, _) => {
        state.orderLoading = true;
        state.orderError = false;
      })
      .addCase(deleteOnlineOrder.rejected, (state, _) => {
        state.orderLoading = false;
        state.orderError = true;
      });
    //add item to the current order
    builder
      .addCase(addItemToCurrentOrder.fulfilled, (state, action) => {
        console.log("fproduct add to the order");
        addProductToOrder(action.payload.orderId, action.payload.productId); // local storage
        state.orderError = false;
        state.orderLoading = false;
        state.total += 1;
      })
      .addCase(addItemToCurrentOrder.pending, (state, _) => {
        state.orderLoading = true;
        state.orderError = false;
      })
      .addCase(addItemToCurrentOrder.rejected, (state, _) => {
        state.orderLoading = false;
        state.orderError = true;
      });
    builder
      .addCase(deleteItemFromOrder.fulfilled, (state, action) => {
        deleteProductFromCurrentOrder(action.payload);
        state.orderError = false;
        state.itemLoading = false;
        state.orderLoading = false;
        state.total += 1;
      })
      .addCase(deleteItemFromOrder.pending, (state, _) => {
        state.itemLoading = true;
        state.orderLoading = true;
        state.orderError = false;
      })
      .addCase(deleteItemFromOrder.rejected, (state, _) => {
        state.itemLoading = false;
        state.orderError = true;
      });
    builder
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.orderSuccess = "Shipping address updated successfully";
        state.orderError = null;
      })
      .addCase(updateAddress.pending, (state, _) => {
        state.orderError = false;
        state.orderError = null;
      })
      .addCase(updateAddress.rejected, (state, _) => {
        state.orderError = "unable to update the shipping address";
      });
  },
});
export const { resetO } = orderSlice.actions;
export default orderSlice.reducer;
