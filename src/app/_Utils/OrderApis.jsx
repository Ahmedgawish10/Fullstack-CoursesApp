import axiosFront from "./axiosFront";

const createOrder = (payload) => axiosFront.post("/orders", payload);

export default {
  createOrder
}
