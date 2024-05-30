import { create } from 'apisauce';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTcxNjkzMTM5MywiZXhwIjoxNzE3MDE3NzkzfQ.vQURRxGiGPyb1jg_70flv7q4xzg9r2kytGPwB6sR1Yc'

const apiClient = create({

    baseURL: "http://localhost:8085",
    // baseURL: "http://192.168.1.2:8085",
    //baseURL: "http://localhost:8085",
    // baseURL: "http://192.168.1.102:8085",
    headers: {

        Authorization: `Bearer ${TOKEN}`
    }


}

);


export default apiClient;
