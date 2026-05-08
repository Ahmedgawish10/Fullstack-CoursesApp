"use client"
import { configureStore } from '@reduxjs/toolkit'
import cartslice from "./CartSlice"
import wishlistslice from "./WishlistSlice"

const store = configureStore({
  reducer: {
    cart: cartslice,
    wishlist: wishlistslice
  },
})

export default store;
