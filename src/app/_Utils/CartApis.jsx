import axiosFront from "./axiosFront";
const addToCart=(payload)=>axiosFront.post("/carts",payload);
const getCart=()=>axiosFront.get(`http://localhost:1337/api/carts?populate[courses][populate]=images&filters[email][$eq]=ajawysh980@gmail.com`);
const deleteCourse=(id)=>axiosFront.delete(`/carts/${id}`);

export default {
    addToCart,
    getCart,
    deleteCourse
}

//`/carts?populate[courses][populate]=flag&filters[email][$eq]=ahmedgawish@gmail.com`