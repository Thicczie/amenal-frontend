

import { KeyboardReturnTwoTone } from "@mui/icons-material";
import useApiClient from "./apiClient";

//const apiClient = useApiClient();


const useChartApi = () => {
    const apiClient = useApiClient();




    //CHECKED: TRUE
    //Get chart data by project ID and tache IDs
    const getChartDataByProjectIdAndTacheIds = (projectId, charge, tacheIds) => {
        const params = new URLSearchParams();
        tacheIds.forEach((number) => {
            params.append("tacheIds", number);
        });
        return apiClient.get(`ChartData/project/${projectId}/tache/charge/${charge}`, params);
    };

    // Get chart data by project ID and lots
    const getChartDataByProjectIdAndLots = (projectId, charge, lots) => {
        const params = new URLSearchParams();
        lots.forEach((number) => {
            params.append("lots", number);
        });

        return apiClient.get(`ChartData/project/${projectId}/lot/charge/${charge}`, params);
    };

    // Get chart data by project ID and produits
    const getChartDataByProjectIdAndProduits = (projectId, charge, produits) => {
        const params = new URLSearchParams();
        produits.forEach((number) => {
            params.append("produits", number);
        });
        return apiClient.get(`ChartData/project/${projectId}/produit/charge/${charge}`, params);
    };




    //CHECKED: FALSE 

    // Get chart data by avenant ID and tache IDs
    const getChartDataByAvenantIdAndTacheIds = (avenantId, charge, tacheIds) => {
        const params = new URLSearchParams();
        tacheIds.forEach((number) => {
            params.append("tacheIds", number);
        });
        return apiClient.get(`ChartData/avenant/${avenantId}/tache/charge/${charge}`,
            params

        );
    };

    // Get chart data by avenant ID and lots
    const getChartDataByAvenantIdAndLots = (avenantId, charge, lots) => {
        const params = new URLSearchParams();
        lots.forEach((number) => {
            params.append("lots", number);
        });

        return apiClient.get(`ChartData/avenant/${avenantId}/lot/charge/${charge}`, params);
    };

    // Get chart data by avenant ID and produits
    const getChartDataByAvenantIdAndProduits = (avenantId, charge, produits) => {
        const params = new URLSearchParams();
        produits.forEach((number) => {
            params.append("produits", number);
        });

        return apiClient.get(`ChartData/avenant/${avenantId}/produit/charge/${charge}`, params);
    };


    return {
        getChartDataByProjectIdAndTacheIds,
        getChartDataByProjectIdAndLots,
        getChartDataByProjectIdAndProduits,
        getChartDataByAvenantIdAndTacheIds,
        getChartDataByAvenantIdAndLots,
        getChartDataByAvenantIdAndProduits,
    }
}


export default useChartApi;

