import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartApis from "../_Utils/CartApis";
import { toast } from 'react-hot-toast';

const initialState = []

export const addToCart = createAsyncThunk('cart/addToCart',
  async (payload, thunkAPI) => {
    try {
      const response = await CartApis.addToCart(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk('cart/removeFromCart',
  async (courseId, thunkAPI) => {
    try {
      const response = await CartApis.deleteCourse(courseId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getv = createAsyncThunk('cart/getc',
  async (payload, thunkAPI) => {
    try {
      const response = await CartApis.getCart(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getcount(state, action) {
      return state = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.push(action.payload?.data);
    })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        toast.error('the coures deleted successfully');
        return state.filter(course => course.id !== action.payload?.data?.id);
      })
  },
});

export default cartSlice.reducer;
export const { getcount } = cartSlice.actions;
