"use client";

import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../_redux/CartSlice";

export function useAddToCart() {
  const { user } = useUser();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (course) => {
    const existingItem = cart.find(
      (myCourse) => myCourse.attributes.courseId === course?.id
    );

    if (existingItem) {
      toast.loading(`Your ${course?.attributes?.title} already in Cart`, {
        duration: 2000,
      });
      return;
    }

    if (!user) {
      toast.error(`Your Are not Logged in`);
      return;
    }

    toast.success(`Your ${course?.attributes?.title} added to Cart`);
    const addToCartData = {
      data: {
        userName: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        courses: [course?.id],
        courseId: course?.id,
      },
    };

    dispatch(addToCart(addToCartData));
  };

  return handleAddToCart;
}
