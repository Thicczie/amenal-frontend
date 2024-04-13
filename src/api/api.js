import apiClient from "./apiClient";
//To do: change localhost to your appropriate id

// ProjetInfos
export const getProjects = () => apiClient.get("/projects");

export const getProjectById = (id) => apiClient.get("/projects/" + id);
export const getAvenantsByProjectId = (id) => apiClient.get("/avenants/project/" + id);
export const getAvenantById = (avenantId) => {
  return apiClient.get(`/avenants/${avenantId}`);
};





// ProduitTable
export const getSigmaProduitTable = (id, charge) => apiClient.get("/produitTable/project/" + id + "/charge/" + charge);
export const getProduitTableByAvenantId = (id, charge) => apiClient.get("/produitTable/avenant/" + id + "/charge/" + charge);

// LotTable
export const getSigmaLotTable = (id, charge) => apiClient.get("/lotTable/project/" + id + "/charge/" + charge);
export const getLotTableByAvenantId = (id, charge) => apiClient.get("/lotTable/avenant/" + id + "/charge/" + charge);

// TacheTable
export const getSigmaTacheTable = (id, charge) => apiClient.get("/tacheTable/project/" + id + "/charge/" + charge);
export const getTacheTableByAvenantId = (id, charge) => apiClient.get("/tacheTable/avenant/" + id + "/charge/" + charge);

