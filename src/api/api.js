import apiClient from "./apiClient";
//To do: change localhost to your appropriate id

// ProjetInfos
export const getProjects =  () => apiClient.get("/projects");
    
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

// Get chart data by project ID and tache IDs
export const getChartDataByProjectIdAndTacheIds = (projectId, charge, tacheIds) => {
    return apiClient.get(`/ChartData/project/${projectId}/tache/charge/${charge}`, {
      params: {
        tacheIds: tacheIds
      }
    });
  };
  
  // Get chart data by project ID and lots
  export const getChartDataByProjectIdAndLots = (projectId, charge, lots) => {
    return apiClient.get(`/ChartData/project/${projectId}/lot/charge/${charge}`, {
      params: {
        lots: lots
      }
    });
  };
  
  // Get chart data by project ID and produits
  export const getChartDataByProjectIdAndProduits = (projectId, charge, produits) => {
    return apiClient.get(`/ChartData/project/${projectId}/produit/charge/${charge}`, {
      params: {
        produits: produits
      }
    });
  };
  
  // Get chart data by avenant ID and tache IDs
  export const getChartDataByAvenantIdAndTacheIds = (avenantId, charge) => {
    return apiClient.get(`/ChartData/avenant/${avenantId}/charge/${charge}`, {
    //   params: {
    //     tacheIds: tacheIds
    //   }
    });
  };
  
  // Get chart data by avenant ID and lots
  export const getChartDataByAvenantIdAndLots = (avenantId, charge, lots) => {
    return apiClient.get(`/ChartData/avenant/${avenantId}/lot/charge/${charge}`, {
      params: {
        lots: lots
      }
    });
  };
  
  // Get chart data by avenant ID and produits
  export const getChartDataByAvenantIdAndProduits = (avenantId, charge, produits) => {
    return apiClient.get(`/ChartData/avenant/${avenantId}/produit/charge/${charge}`, {
      params: {
        produits: produits
      }
    });
  };