import apiClient from "./apiClient";
//To do: change localhost to your appropriate id

// ProjetInfos
export const getProjects = () => apiClient.get("/projects");
export const getProjectById = (id:any) => apiClient.get("/projects/" + id);
export const getAvenantsByProjectId = (id:any) => apiClient.get("/avenants/project/" + id);





// ProduitTable
export const getSigmaProduitTable = (id:any, charge:any) => apiClient.get("/produitTable/project/" + id + "/charge/" + charge);
export const getProduitTableByAvenantId = (id:any, charge:any) => apiClient.get("/produitTable/avenant/" + id + "/charge/" + charge);

// LotTable
export const getSigmaLotTable = (id:any, charge:any) => apiClient.get("/lotTable/project/" + id + "/charge/" + charge);
export const getLotTableByAvenantId = (id:any, charge:any) => apiClient.get("/lotTable/avenant/" + id + "/charge/" + charge);

// TacheTable
export const getSigmaTacheTable = (id:any, charge:any) => apiClient.get("/tacheTable/project/" + id + "/charge/" + charge);
export const getTacheTableByAvenantId = (id:any, charge:any) => apiClient.get("/tacheTable/avenant/" + id + "/charge/" + charge);