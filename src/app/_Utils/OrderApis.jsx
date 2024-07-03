import axiosFront from "./axiosFront";
const createOrder=(payload)=>axiosFront.post("/orders",payload);

export default {
    createOrder
}

//`/carts?populate[courses][populate]=flag&filters[email][$eq]=ahmedgawish@gmail.com`