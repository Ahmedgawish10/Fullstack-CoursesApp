const {default:axios }=require('axios')
const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl="https://strapi-test-5qa0.onrender.com/api"
// const apiUrl="http://localhost:1337/api"
// const apiUrl="https://strapi-test-5qa0.onrender.com/api"

const axiosFront= axios.create({
    baseURL: apiUrl, 
    headers: {
        Authorization:`Bearer + ${apiKey}`
    }
  });

  export default  axiosFront;