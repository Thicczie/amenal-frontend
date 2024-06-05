import useApiClient from "./apiClient";
import apisauceClient from "./auth/apisauceClient";

//const apiClient = useApiClient();


const useDetailApi = () => {
    const apiClient = useApiClient();



    //detailChargeTable:
    const getDetailChargeTable = (projectId) => {
        return apiClient.get(`/detailChargeTable/project/${projectId}`);
    };


    //TABLE LOT : 

    //and project(sigma) (table lot )
    const getFilteredDetailChargeTableByLotAndProject = (projectId, lotId) => {
        return apiClient.get(`/detailChargeTable/project/${projectId}/lot/${lotId}`);
    };



    //TABLE PRODUIT: 

    //produit (table produit)
    const getFilteredDetailChargeTableByProduitAndProject = (projectId, produitDesignation) => {
        return apiClient.get(`/detailChargeTable/project/${projectId}/produit/${produitDesignation}`);
    };


    //lot de produit  (table produit)
    const getFilteredDetailChargeTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
        return apiClient.get(`/detailChargeTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
    };


    // detail activité primaire ,  secondaire  (table produit) / table tache  / activité lot (table lot)
    const getFilteredDetailChargeTableByTacheAndProject = (projectId, tacheId) => {
        return apiClient.get(`/detailChargeTable/project/${projectId}/tache/${tacheId}`);
    };



    //notsigma
    const getDetailChargeTableByAvenantId = (avenantId) => {
        return apiClient.get(`/detailChargeTable/avenant/${avenantId}`);
    };




    //TABLE LOT
    const getFilteredDetailChargeTableByLotAndAvenant = (lotId, avenantId) => {
        return apiClient.get(`/detailChargeTable/avenant/${avenantId}/lot/${lotId}`);
    };

    //TABLE PRODUIT 

    //lot produit
    const getFilteredDetailChargeTableByLotAndProduitAndAvenant = (lotId, produitId) => {
        return apiClient.get(`/detailChargeTable/lot/${lotId}/produit/${produitId}`);
    };

    //produit

    const getFilteredDetailChargeTableByProduitAndAvenant = (produitId, avenantId) => {
        return apiClient.get(`/detailChargeTable/avenant/${avenantId}/produit/${produitId}`);
    };


    //activ primaire  , sec , / tache , activité lot
    const getFilteredDetailChargeTableByTacheAndAvenant = (tacheId) => {
        return apiClient.get(`/detailChargeTable/avenant/tache/${tacheId}`);
    };










    //detailProduitTable:

    const getDetailProduitTable = (projectId) => {
        return apiClient.get(`/detailProduitTable/project/${projectId}`);
    };

    const getFilteredDetailProduitTableByLotAndProject = (projectId, lotId) => {
        return apiClient.get(`/detailProduitTable/project/${projectId}/lot/${lotId}`);
    };

    const getFilteredDetailProduitTableByProduitAndProject = (projectId, produitDesignation) => {
        return apiClient.get(`/detailProduitTable/project/${projectId}/produit/${produitDesignation}`);
    };

    const getFilteredDetailProduitTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
        return apiClient.get(`/detailProduitTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
    };

    const getFilteredDetailProduitTableByTacheAndProject = (projectId, tacheId) => {
        return apiClient.get(`/detailProduitTable/project/${projectId}/tache/${tacheId}`);
    };

    const getDetailProduitTableByAvenantId = (avenantId) => {
        return apiClient.get(`/detailProduitTable/avenant/${avenantId}`);
    };

    const getFilteredDetailProduitTableByLotAndProduitAndAvenant = (lotId, produitId) => {
        return apiClient.get(`/detailProduitTable/lot/${lotId}/produit/${produitId}`);
    };

    const getFilteredDetailProduitTableByLotAndAvenant = (lotId, avenantId) => {
        return apiClient.get(`/detailProduitTable/avenant/${avenantId}/lot/${lotId}`);
    };

    const getFilteredDetailProduitTableByProduitAndAvenant = (produitId, avenantId) => {
        return apiClient.get(`/detailProduitTable/avenant/${avenantId}/produit/${produitId}`);
    };

    const getFilteredDetailProduitTableByTacheAndAvenant = (tacheId) => {
        return apiClient.get(`/detailProduitTable/avenant/tache/${tacheId}`);
    };











    //DetailQualiteTable
    const getDetailQualiteTable = (projectId) => {
        return apiClient.get(`/detailQualiteTable/project/${projectId}`);
    };

    const getFilteredDetailQualiteTableByLotAndProject = (projectId, lotId) => {
        return apiClient.get(`/detailQualiteTable/project/${projectId}/lot/${lotId}`);
    };

    const getFilteredDetailQualiteTableByProduitAndProject = (projectId, produitDesignation) => {
        return apiClient.get(`/detailQualiteTable/project/${projectId}/produit/${produitDesignation}`);
    };

    const getFilteredDetailQualiteTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
        return apiClient.get(`/detailQualiteTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
    };

    const getFilteredDetailQualiteTableByTacheAndProject = (projectId, tacheId) => {
        return apiClient.get(`/detailQualiteTable/project/${projectId}/tache/${tacheId}`);
    };



    const getDetailQualiteTableByAvenantId = (avenantId) => {
        return apiClient.get(`/detailQualiteTable/avenant/${avenantId}`);
    };

    const getFilteredDetailQualiteTableByLotAndProduitAndAvenant = (lotId, produitId) => {
        return apiClient.get(`/detailQualiteTable/lot/${lotId}/produit/${produitId}`);
    };

    const getFilteredDetailQualiteTableByLotAndAvenant = (lotId, avenantId) => {
        return apiClient.get(`/detailQualiteTable/avenant/${avenantId}/lot/${lotId}`);
    };

    const getFilteredDetailQualiteTableByProduitAndAvenant = (produitId, avenantId) => {
        return apiClient.get(`/detailQualiteTable/avenant/${avenantId}/produit/${produitId}`);
    };

    const getFilteredDetailQualiteTableByTacheAndAvenant = (tacheId) => {
        return apiClient.get(`/detailQualiteTable/avenant/tache/${tacheId}`);
    };

    //DetailDelai
    const getDetailDelaiTable = (projectId) => {
        return apiClient.get(`/detailDelaiTable/project/${projectId}`);
    };

    const getFilteredDetailDelaiTableByLotAndProject = (projectId, lotId) => {
        return apiClient.get(`/detailDelaiTable/project/${projectId}/lot/${lotId}`);
    };

    const getFilteredDetailDelaiTableByProduitAndProject = (projectId, produitDesignation) => {
        return apiClient.get(`/detailDelaiTable/project/${projectId}/produit/${produitDesignation}`);
    };

    const getFilteredDetailDelaiTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
        return apiClient.get(`/detailDelaiTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
    };


    // all except activité principale 
    const getFilteredDetailDelaiTableByTacheAndProject = (projectId, tacheId) => {
        return apiClient.get(`/detailDelaiTable/project/${projectId}/tache/${tacheId}`);
    };


    // activité principale (table produit)
    const getFilteredDetailDelaiTableByActivitePrincipaleAndProject = (projectId, tacheId) => {
        return apiClient.get(`/detailDelaiTable/activitePrincipale/${tacheId}`);
    };




    // not sigma 

    const getDetailDelaiTableByAvenantId = (id) => {
        return apiClient.get(`/detailDelaiTable/avenant/${id}`);
    };

    const getFilteredDetailDelaiTableByLotAndProduitAndAvenant = (lotId, produitId) => {
        return apiClient.get(`/detailDelaiTable/lot/${lotId}/produit/${produitId}`);
    };

    const getFilteredDetailDelaiTableByLotAndAvenant = (lotId, avenantId) => {
        return apiClient.get(`/detailDelaiTable/avenant/${avenantId}/lot/${lotId}`);
    };

    const getFilteredDetailDelaiTableByProduitAndAvenant = (produitId, avenantId) => {
        return apiClient.get(`/detailDelaiTable/avenant/${avenantId}/produit/${produitId}`);
    };




    const getFilteredDetailDelaiTableByTacheAndAvenant = (tacheId) => {
        return apiClient.get(`/detailDelaiTable/avenant/tache/${tacheId}`);
    };


    const getFilteredDetailDelaiTableByActivitePrincipaleAndAvenant = (tacheId) => {
        return apiClient.get(`/detailDelaiTable/avenant/activitePrincipale/${tacheId}`);
    };








    //save Details Attente
    const saveAllDetailProduitAttentes = async (detailProduitAttentes, onUploadProgress) => {
        try {
            const response = await apiClient.post(`/detailProduitAttentes/addAll`, detailProduitAttentes, { onUploadProgress: progressEvent => onUploadProgress(progressEvent, 'detailProduit') });
            return response;
        } catch (error) {
            console.error('Error saving DetailProduitAttentes:', error);
            throw error;
        }
    };

    const saveAllDetailChargeAttentes = async (detailChargeAttentes, onUploadProgress) => {
        try {
            const response = await apiClient.post(`/detailChargeAttentes/addAll`, detailChargeAttentes, { onUploadProgress: progressEvent => onUploadProgress(progressEvent, 'detailCharge') });
            return response;
        } catch (error) {
            console.error('Error saving DetailChargeAttentes:', error);
            throw error;
        }
    };

    const saveAllDetailDelaiAttentes = async (detailDelaiAttentes, onUploadProgress) => {
        try {
            const response = await apiClient.post(`/detailDelaiAttentes/addAll`, detailDelaiAttentes, { onUploadProgress: progressEvent => onUploadProgress(progressEvent, 'detailDelai') });
            return response;
        } catch (error) {
            console.error('Error saving DetailDelaiAttentes:', error);
            throw error;
        }
    };

    const saveAllDetailQualiteAttentes = async (detailQualiteAttentes, onUploadProgress) => {
        try {
            const response = await apiClient.post(`/detailQualiteAttentes/addAll`, detailQualiteAttentes, { onUploadProgress: progressEvent => onUploadProgress(progressEvent, 'detailQualite') });
            return response;
        } catch (error) {
            console.error('Error saving DetailQualiteAttentes:', error);
            throw error;
        }
    };


    // get DetailsAttente By avenant Id:
    const getDetailChargeAttentesByAvenantId = (avenantId) => {
        return apiClient.get(`/detailChargeAttentes/avenant/${avenantId}`);
    };


    //get  previous uploaded files with errors  , after valider can upload
    const getDetailProduitAttentesByAvenantId = (avenantId) => {
        return apiClient.get(`/detailProduitAttentes/avenant/${avenantId}`);
    };

    const getDetailDelaiAttentesByAvenantId = (avenantId) => {
        return apiClient.get(`/detailDelaiAttentes/avenant/${avenantId}`);
    };

    const getDetailQualiteAttentesByAvenantId = (avenantId) => {
        return apiClient.get(`/detailQualiteAttentes/avenant/${avenantId}`);
    };

    //valider all detail attentes of an avenant id :

    const validerDetailProduitAttentesByAvenantId = async (avenantId) => {
        try {
            const response = await apiClient.post(`/detailProduitAttentes/valider/${avenantId}`, {});
            return response;
        } catch (error) {
            console.error('Error saving DetailProduitAttentes:', error);
            throw error;
        }
    };

    const validerDetailChargeAttentesByAvenantId = async (avenantId) => {
        try {
            const response = await apiClient.post(`/detailChargeAttentes/valider/${avenantId}`, {});
            return response;
        } catch (error) {
            console.error('Error saving DetailChargeAttentes:', error);
            throw error;
        }
    };

    const validerDetailDelaiAttentesByAvenantId = async (avenantId) => {
        try {
            const response = await apiClient.post(`/detailDelaiAttentes/valider/${avenantId}`, {});
            return response;
        } catch (error) {
            console.error('Error saving DetailDelaiAttentes:', error);
            throw error;
        }
    };

    const validerDetailQualiteAttentesByAvenantId = async (avenantId) => {
        try {
            const response = await apiClient.post(`/detailQualiteAttentes/valider/${avenantId}`);
            return response;
        } catch (error) {
            console.error('Error saving DetailQualiteAttentes:', error);
            throw error;
        }
    };

    return {
        saveAllDetailProduitAttentes,
        saveAllDetailChargeAttentes,
        saveAllDetailDelaiAttentes,
        saveAllDetailQualiteAttentes,

        getDetailProduitAttentesByAvenantId,

        validerDetailProduitAttentesByAvenantId,
        validerDetailChargeAttentesByAvenantId,
        validerDetailDelaiAttentesByAvenantId,
        validerDetailQualiteAttentesByAvenantId,


        getDetailDelaiAttentesByAvenantId,
        getDetailQualiteAttentesByAvenantId,



        getDetailChargeAttentesByAvenantId,
        getFilteredDetailChargeTableByLotAndAvenant,
        getFilteredDetailChargeTableByLotAndProduitAndAvenant,
        getFilteredDetailChargeTableByProduitAndAvenant,
        getFilteredDetailChargeTableByTacheAndAvenant,
        getFilteredDetailDelaiTableByLotAndAvenant,
        getFilteredDetailDelaiTableByLotAndProduitAndAvenant,
        getFilteredDetailDelaiTableByProduitAndAvenant,
        getFilteredDetailDelaiTableByTacheAndAvenant,
        getFilteredDetailProduitTableByLotAndAvenant,
        getFilteredDetailProduitTableByLotAndProduitAndAvenant,
        getFilteredDetailProduitTableByProduitAndAvenant,
        getFilteredDetailProduitTableByTacheAndAvenant,
        getFilteredDetailQualiteTableByLotAndAvenant,
        getFilteredDetailQualiteTableByLotAndProduitAndAvenant,
        getFilteredDetailQualiteTableByProduitAndAvenant,
        getFilteredDetailQualiteTableByTacheAndAvenant,
        getDetailChargeTable,
        getFilteredDetailChargeTableByLotAndProject,
        getFilteredDetailChargeTableByProduitAndProject,
        getFilteredDetailChargeTableByProduitAndLotAndProject,
        getFilteredDetailChargeTableByTacheAndProject,
        getDetailChargeTableByAvenantId,
        getDetailProduitTable,
        getFilteredDetailProduitTableByLotAndProject,
        getFilteredDetailProduitTableByProduitAndProject,
        getFilteredDetailProduitTableByProduitAndLotAndProject,
        getFilteredDetailProduitTableByTacheAndProject,
        getDetailProduitTableByAvenantId,
        getDetailQualiteTable,
        getFilteredDetailQualiteTableByLotAndProject,
        getFilteredDetailQualiteTableByProduitAndProject,
        getFilteredDetailQualiteTableByProduitAndLotAndProject,
        getFilteredDetailQualiteTableByTacheAndProject,
        getDetailQualiteTableByAvenantId,
        getDetailDelaiTable,
        getFilteredDetailDelaiTableByLotAndProject,
        getFilteredDetailDelaiTableByProduitAndProject,
        getFilteredDetailDelaiTableByProduitAndLotAndProject,
        getFilteredDetailDelaiTableByTacheAndProject,
        getFilteredDetailDelaiTableByActivitePrincipaleAndProject,
        getDetailDelaiTableByAvenantId,
        getFilteredDetailDelaiTableByActivitePrincipaleAndAvenant,


    }

}

export default useDetailApi