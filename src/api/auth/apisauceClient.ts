import { create } from 'apisauce';
const apisauceClient = create({
        
   baseURL: "http://localhost:8085",
    //baseURL: "http://192.168.1.2:8085",
    //baseURL: "http://localhost:8085",
    // baseURL: "http://192.168.1.102:8085",
    headers: {
        
        Accept: 'application/json',
    }
    
    
});


export default apisauceClient