"use client";

import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToWishlist } from "../_redux/WishlistSlice";

export function useAddToWishlist() {
  const { user } = useUser();
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleAddToWishlist = (course) => {
    const existingItem =
      course?.id &&
      wishlist?.find((w) =>
        w?.attributes?.courses?.data?.some(
          (c) => String(c?.id) === String(course?.id)
        )
      );

    if (existingItem) {
      toast.loading( `Your ${course?.attributes?.title} already in Wishlist`,{ duration: 2000 });
      return;
    }

    if (!user) {
      toast.error(`Your Are not Logged in`);
      return;
    }

    toast.success(`Your ${course?.attributes?.title} added to Wishlist`);
    const addToWishlistData = {
      data: {
        userName: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        courses: [course?.id],
        courseId: course?.id,
      },
    };

    dispatch(addToWishlist(addToWishlistData));
  };

  return handleAddToWishlist;
}
