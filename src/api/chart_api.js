
import apiClient from "./apiClient";




//CHECKED: TRUE
//Get chart data by project ID and tache IDs
export const getChartDataByProjectIdAndTacheIds = (projectId, charge, tacheIds) => {
    return apiClient.get(`/project/${projectId}/tache/charge/${charge}`, {
        params: {
            tacheIds: tacheIds
        }
    });
};

// Get chart data by project ID and lots
export const getChartDataByProjectIdAndLots = (projectId, charge, lots) => {
    return apiClient.get(`/project/${projectId}/lot/charge/${charge}`, {
        params: {
            lots: lots
        }
    });
};

// Get chart data by project ID and produits
export const getTacheTableByProjectId = (projectId, charge, produits) => {
    return apiClient.get(`/project/${projectId}/produit/charge/${charge}`, {
        params: {
            produits: produits
        }
    });
};




//CHECKED: FALSE 

// Get chart data by avenant ID and tache IDs
export const getChartDataByAvenantIdAndTacheIds = (avenantId, charge, tacheIds) => {
    return apiClient.get(`/avenant/${avenantId}/tache/charge/${charge}`, {
        params: {
            tacheIds: tacheIds
        }
    });
};

// Get chart data by avenant ID and lots
export const getChartDataByAvenantIdAndLots = (avenantId, charge, lots) => {
    return apiClient.get(`/avenant/${avenantId}/lot/charge/${charge}`, {
        params: {
            lots: lots
        }
    });
};

// Get chart data by avenant ID and produits
export const getChartDataByAvenantIdAndProduits = (avenantId, charge, produits) => {
    return apiClient.get(`/avenant/${avenantId}/produit/charge/${charge}`, {
        params: {
            produits: produits
        }
    });
};