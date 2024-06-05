import useApiClient from "../apiClient";


const useUserMgApi=()=>{

    const apiClient = useApiClient();
    

const getUsers = () => apiClient.get("/admin/users");
const getUserById = (id:number) => apiClient.get("/admin/users/" + id);
const setToManager = (id:number) => apiClient.put("/admin/users/manager/" + id);
const setToSupManager = (id:number) => apiClient.put("/admin/users/supManager/" + id);
const setToAdmin = (id:number) => apiClient.put("/admin/users/admin/" + id);
const deleteUser = (id:number) => apiClient.delete("/admin/users/" + id);

return {

    getUsers,
    getUserById,
    setToManager,
    setToSupManager,
    setToAdmin,
    deleteUser

    }
}

export default useUserMgApi;