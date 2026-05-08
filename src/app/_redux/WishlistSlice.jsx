"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import WishlistApis from "../_Utils/WishlistApis";

const initialState = [];

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (payload, thunkAPI) => {
    try {
      await WishlistApis.addToWishlist(payload);
      const email = payload?.data?.email;
      if (!email) return thunkAPI.rejectWithValue("Missing user email");

      const refreshed = await WishlistApis.getWishlist(email);
      return refreshed.data?.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (wishlistItemId, thunkAPI) => {
    try {
      const response = await WishlistApis.deleteWishlistItem(wishlistItemId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Replace entire list with populated data from the server
        return action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        toast.error(action.payload || "Failed to add to wishlist");
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        toast.success("Removed from wishlist");
        return state.filter((item) => item.id !== action.payload?.data?.id);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        toast.error(action.payload || "Failed to remove from wishlist");
      });
  },
});

export default wishlistSlice.reducer;
export const { setWishlist } = wishlistSlice.actions;

