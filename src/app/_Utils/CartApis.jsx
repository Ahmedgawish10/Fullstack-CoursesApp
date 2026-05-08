import axiosFront from "./axiosFront";

const addToCart = (payload) => axiosFront.post("/carts", payload);
const getCart = (email) => axiosFront.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/carts?populate[courses][populate]=images&filters[email][$eq]=${email}`);
const deleteCourse = (id) => axiosFront.delete(`/carts/${id}`);

export default {
  addToCart,
  getCart,
  deleteCourse
}
