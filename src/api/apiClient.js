import { create } from 'apisauce';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hZ2VyQG1haWwuY29tIiwiaWF0IjoxNzE2OTI4NDAxLCJleHAiOjE3MTcwMTQ4MDF9.uwzbSjEy-lC2bjLenLJxhJ212jg1Fn8DZBkCa0vHljo';

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
