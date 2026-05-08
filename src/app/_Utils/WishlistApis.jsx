"use client";

import axiosFront from "./axiosFront";

const addToWishlist = (payload) => axiosFront.post("/wishlists", payload);

const getWishlist = (email) => axiosFront.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/wishlists?populate[courses][populate]=images&filters[email][$eq]=${email}`);

const deleteWishlistItem = (id) => axiosFront.delete(`/wishlists/${id}`);

export default {
  addToWishlist,
  getWishlist,
  deleteWishlistItem,
};

