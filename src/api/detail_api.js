import apiClient from "./apiClient";


//detailChargeTable:
export const getDetailChargeTable = (projectId) => {
    return apiClient.get(`/detailChargeTable/project/${projectId}`);
};


//TABLE LOT : 

//and project(sigma) (table lot )
export const getFilteredDetailChargeTableByLotAndProject = (projectId, lotId) => {
    return apiClient.get(`/detailChargeTable/project/${projectId}/lot/${lotId}`);
};



//TABLE PRODUIT: 

//produit (table produit)
export const getFilteredDetailChargeTableByProduitAndProject = (projectId, produitDesignation) => {
    return apiClient.get(`/detailChargeTable/project/${projectId}/produit/${produitDesignation}`);
};


//lot de produit  (table produit)
export const getFilteredDetailChargeTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
    return apiClient.get(`/detailChargeTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
};


// detail activité primaire ,  secondaire  (table produit) / table tache  / activité lot (table lot)
export const getFilteredDetailChargeTableByTacheAndProject = (projectId, tacheId) => {
    return apiClient.get(`/detailChargeTable/project/${projectId}/tache/${tacheId}`);
};



//notsigma
export const getDetailChargeTableByAvenantId = (avenantId) => {
    return apiClient.get(`/detailChargeTable/avenant/${avenantId}`);
};




//TABLE LOT
export const getFilteredDetailChargeTableByLotAndAvenant = (lotId, avenantId) => {
    return apiClient.get(`/detailChargeTable/avenant/${avenantId}/lot/${lotId}`);
};

//TABLE PRODUIT 

//lot produit
export const getFilteredDetailChargeTableByLotAndProduitAndAvenant = (lotId, produitId) => {
    return apiClient.get(`/detailChargeTable/lot/${lotId}/produit/${produitId}`);
};

//produit

export const getFilteredDetailChargeTableByProduitAndAvenant = (produitId, avenantId) => {
    return apiClient.get(`/detailChargeTable/avenant/${avenantId}/produit/${produitId}`);
};


//activ primaire  , sec , / tache , activité lot
export const getFilteredDetailChargeTableByTacheAndAvenant = (tacheId) => {
    return apiClient.get(`/detailChargeTable/avenant/tache/${tacheId}`);
};










//detailProduitTable:

export const getDetailProduitTable = (projectId) => {
    return apiClient.get(`/detailProduitTable/project/${projectId}`);
};

export const getFilteredDetailProduitTableByLotAndProject = (projectId, lotId) => {
    return apiClient.get(`/detailProduitTable/project/${projectId}/lot/${lotId}`);
};

export const getFilteredDetailProduitTableByProduitAndProject = (projectId, produitDesignation) => {
    return apiClient.get(`/detailProduitTable/project/${projectId}/produit/${produitDesignation}`);
};

export const getFilteredDetailProduitTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
    return apiClient.get(`/detailProduitTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
};

export const getFilteredDetailProduitTableByTacheAndProject = (projectId, tacheId) => {
    return apiClient.get(`/detailProduitTable/project/${projectId}/tache/${tacheId}`);
};

export const getDetailProduitTableByAvenantId = (avenantId) => {
    return apiClient.get(`/detailProduitTable/avenant/${avenantId}`);
};

export const getFilteredDetailProduitTableByLotAndProduitAndAvenant = (lotId, produitId) => {
    return apiClient.get(`/detailProduitTable/lot/${lotId}/produit/${produitId}`);
};

export const getFilteredDetailProduitTableByLotAndAvenant = (lotId, avenantId) => {
    return apiClient.get(`/detailProduitTable/avenant/${avenantId}/lot/${lotId}`);
};

export const getFilteredDetailProduitTableByProduitAndAvenant = (produitId, avenantId) => {
    return apiClient.get(`/detailProduitTable/avenant/${avenantId}/produit/${produitId}`);
};

export const getFilteredDetailProduitTableByTacheAndAvenant = (tacheId) => {
    return apiClient.get(`/detailProduitTable/avenant/tache/${tacheId}`);
};











//DetailQualiteTable
export const getDetailQualiteTable = (projectId) => {
    return apiClient.get(`/detailQualiteTable/project/${projectId}`);
};

export const getFilteredDetailQualiteTableByLotAndProject = (projectId, lotId) => {
    return apiClient.get(`/detailQualiteTable/project/${projectId}/lot/${lotId}`);
};

export const getFilteredDetailQualiteTableByProduitAndProject = (projectId, produitDesignation) => {
    return apiClient.get(`/detailQualiteTable/project/${projectId}/produit/${produitDesignation}`);
};

export const getFilteredDetailQualiteTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
    return apiClient.get(`/detailQualiteTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
};

export const getFilteredDetailQualiteTableByTacheAndProject = (projectId, tacheId) => {
    return apiClient.get(`/detailQualiteTable/project/${projectId}/tache/${tacheId}`);
};



export const getDetailQualiteTableByAvenantId = (avenantId) => {
    return apiClient.get(`/detailQualiteTable/avenant/${avenantId}`);
};

export const getFilteredDetailQualiteTableByLotAndProduitAndAvenant = (lotId, produitId) => {
    return apiClient.get(`/detailQualiteTable/lot/${lotId}/produit/${produitId}`);
};

export const getFilteredDetailQualiteTableByLotAndAvenant = (lotId, avenantId) => {
    return apiClient.get(`/detailQualiteTable/avenant/${avenantId}/lot/${lotId}`);
};

export const getFilteredDetailQualiteTableByProduitAndAvenant = (produitId, avenantId) => {
    return apiClient.get(`/detailQualiteTable/avenant/${avenantId}/produit/${produitId}`);
};

export const getFilteredDetailQualiteTableByTacheAndAvenant = (tacheId) => {
    return apiClient.get(`/detailQualiteTable/avenant/tache/${tacheId}`);
};

//DetailDelai
export const getDetailDelaiTable = (projectId) => {
    return apiClient.get(`/detailDelaiTable/project/${projectId}`);
};

export const getFilteredDetailDelaiTableByLotAndProject = (projectId, lotId) => {
    return apiClient.get(`/detailDelaiTable/project/${projectId}/lot/${lotId}`);
};

export const getFilteredDetailDelaiTableByProduitAndProject = (projectId, produitDesignation) => {
    return apiClient.get(`/detailDelaiTable/project/${projectId}/produit/${produitDesignation}`);
};

export const getFilteredDetailDelaiTableByProduitAndLotAndProject = (projectId, lotId, produitDesignation) => {
    return apiClient.get(`/detailDelaiTable/project/${projectId}/lot/${lotId}/produit/${produitDesignation}`);
};


// all except activité principale 
export const getFilteredDetailDelaiTableByTacheAndProject = (projectId, tacheId) => {
    return apiClient.get(`/detailDelaiTable/project/${projectId}/tache/${tacheId}`);
};


// activité principale (table produit)
export const getFilteredDetailDelaiTableByActivitePrincipaleAndProject = (projectId, tacheId) => {
    return apiClient.get(`/detailDelaiTable/activitePrincipale/${tacheId}`);
};




// not sigma 

export const getDetailDelaiTableByAvenantId = (id) => {
    return apiClient.get(`/detailDelaiTable/avenant/${id}`);
};

export const getFilteredDetailDelaiTableByLotAndProduitAndAvenant = (lotId, produitId) => {
    return apiClient.get(`/detailDelaiTable/lot/${lotId}/produit/${produitId}`);
};

export const getFilteredDetailDelaiTableByLotAndAvenant = (lotId, avenantId) => {
    return apiClient.get(`/detailDelaiTable/avenant/${avenantId}/lot/${lotId}`);
};

export const getFilteredDetailDelaiTableByProduitAndAvenant = (produitId, avenantId) => {
    return apiClient.get(`/detailDelaiTable/avenant/${avenantId}/produit/${produitId}`);
};




export const getFilteredDetailDelaiTableByTacheAndAvenant = (tacheId) => {
    return apiClient.get(`/detailDelaiTable/avenant/tache/${tacheId}`);
};


export const getFilteredDetailDelaiTableByActivitePrincipaleAndAvenant = (tacheId) => {
    return apiClient.get(`/detailDelaiTable/avenant/activitePrincipale/${tacheId}`);
};








//save Details Attente
export const saveAllDetailProduitAttentes = async (detailProduitAttentes) => {
    try {
        const response = await apiClient.post(`/detailProduitAttentes/addAll`, detailProduitAttentes);
        return response;
    } catch (error) {
        console.error('Error saving DetailProduitAttentes:', error);
        throw error;
    }
};

export const saveAllDetailChargeAttentes = async (detailChargeAttentes) => {
    try {
        const response = await apiClient.post(`/detailChargeAttentes/addAll`, detailChargeAttentes);
        return response;
    } catch (error) {
        console.error('Error saving DetailChargeAttentes:', error);
        throw error;
    }
};

export const saveAllDetailDelaiAttentes = async (detailDelaiAttentes) => {
    try {
        const response = await apiClient.post(`/detailDelaiAttentes/addAll`, detailDelaiAttentes);
        return response;
    } catch (error) {
        console.error('Error saving DetailDelaiAttentes:', error);
        throw error;
    }
};

export const saveAllDetailQualiteAttentes = async (detailQualiteAttentes) => {
    try {
        const response = await apiClient.post(`/detailQualiteAttentes/addAll`, detailQualiteAttentes);
        return response;
    } catch (error) {
        console.error('Error saving DetailQualiteAttentes:', error);
        throw error;
    }
};

// get DetailsAttente By avenant Id:
export const getDetailChargeAttentesByAvenantId = (avenantId) => {
    return apiClient.get(`/detailChargeAttentes/avenant/${avenantId}`);
};


//get  previous uploaded files with errors  , after valider can upload
export const getDetailProduitAttentesByAvenantId = (avenantId) => {
    return apiClient.get(`/detailProduitAttentes/avenant/${avenantId}`);
};

export const getDetailDelaiAttentesByAvenantId = (avenantId) => {
    return apiClient.get(`/detailDelaiAttentes/avenant/${avenantId}`);
};

export const getDetailQualiteAttentesByAvenantId = (avenantId) => {
    return apiClient.get(`/detailQualiteAttentes/avenant/${avenantId}`);
};

//valider all detail attentes of an avenant id :

export const validerDetailProduitAttentesByAvenantId = async (avenantId) => {
    try {
        const response = await apiClient.post(`/detailProduitAttentes/valider/${avenantId}`, {});
        return response;
    } catch (error) {
        console.error('Error saving DetailProduitAttentes:', error);
        throw error;
    }
};

export const validerDetailChargeAttentesByAvenantId = async (avenantId) => {
    try {
        const response = await apiClient.post(`/detailChargeAttentes/valider/${avenantId}`, {});
        return response;
    } catch (error) {
        console.error('Error saving DetailChargeAttentes:', error);
        throw error;
    }
};

export const validerDetailDelaiAttentesByAvenantId = async (avenantId) => {
    try {
        const response = await apiClient.post(`/detailDelaiAttentes/valider/${avenantId}`, {});
        return response;
    } catch (error) {
        console.error('Error saving DetailDelaiAttentes:', error);
        throw error;
    }
};

export const validerDetailQualiteAttentesByAvenantId = async (avenantId) => {
    try {
        const response = await apiClient.post(`/detailQualiteAttentes/valider/${avenantId}`);
        return response;
    } catch (error) {
        console.error('Error saving DetailQualiteAttentes:', error);
        throw error;
    }
};