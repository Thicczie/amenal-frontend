
import useApiClient from "./apiClient";
import apisauceClient from "./auth/apisauceClient";
const apiClient = apisauceClient;
//const apiClient = useApiClient();



const useCrudApi = () => {
    const apiClient = useApiClient();

    const getMetresByAvenantId = (id) => apiClient.get('metreAvs/avenant/' + id);

    const getProduitsByAvenantId = (id) => apiClient.get(`/produits/avenant/${id}`).then(response => response.data);

    const getLotsByProjectId = (id) => apiClient.get(`/lots/project/${id}`).then(response => response.data);

    const getTachesByAvenantId = (id) => apiClient.get(`/taches/avenant/${id}`).then(response => response.data);




    const saveAllProduits = (produits) => apiClient.post(`/produits/addAll`, produits);
    const saveAllLots = (lots) => apiClient.post(`/lots/addAll`, lots);
    const saveAllTaches = (taches) => apiClient.post(`/taches/addAll`, taches);


    // CRUD AVENANT
    const saveAvenant = (avenant) => apiClient.post(`/avenants`, avenant);

    const updateAvenant = (avenant) => apiClient.put(`/avenants`, avenant);

    const deleteAvenant = (avenantId) => apiClient.delete(`/avenants/` + avenantId);



    const saveProjet = (projet) => apiClient.post(`/projects`, projet);

    const updateProjet = (projet) => apiClient.put(`/projects`, projet);

    const deleteProjet = (projetId) => apiClient.delete(`/projects/` + projetId);

    // lots crud:
    const saveLot = (lot) => apiClient.post(`/lots`, lot);

    const updateLot = (lot) => apiClient.put(`/lots`, lot);

    const deleteLot = (lotId) => apiClient.delete(`/lots/` + lotId);

    // produits crud:
    const saveProduit = (produit) => apiClient.post(`/produits`, produit);

    const updateProduit = (produit) => apiClient.put(`/produits`, produit);

    const deleteProduit = (produitId) => apiClient.delete(`/produits/` + produitId);

    // taches crud:
    const saveTache = (tache) => apiClient.post(`/taches`, tache);

    const updateTache = (tache) => apiClient.put(`/taches`, tache);

    const deleteTache = (tacheId) => apiClient.delete(`/taches/` + tacheId);

    // CRUD DETAILS

    // detailProduit crud:
    const saveDetailProduit = (detailProduit) => apiClient.post(`/detailProduits`, detailProduit);

    const updateDetailProduit = (detailProduit) => apiClient.put(`/detailProduits`, detailProduit);

    const deleteDetailProduit = (detailProduitId) => apiClient.delete(`/detailProduits/` + detailProduitId);

    // detailCharge crud:
    const saveDetailCharge = (detailCharge) => apiClient.post(`/detailCharges`, detailCharge);

    const updateDetailCharge = (detailCharge) => apiClient.put(`/detailCharges`, detailCharge);

    const deleteDetailCharge = (detailChargeId) => apiClient.delete(`/detailCharges/` + detailChargeId);
    // detailQualite crud:
    const saveDetailQualite = (detailQualite) => apiClient.post(`/detailQualites`, detailQualite);

    const updateDetailQualite = (detailQualite) => apiClient.put(`/detailQualites`, detailQualite);

    const deleteDetailQualite = (detailQualiteId) => apiClient.delete(`/detailQualites/` + detailQualiteId);



    const saveMetre = (metre) => apiClient.post(`/metreAvs`, metre);

    const updateMetre = (metre) => apiClient.put(`/metreAvs`, metre);

    const deleteMetre = (metreId) => apiClient.delete(`/metreAvs/` + metreId);




    const saveProduitAttente = (produitAttente) => apiClient.post(`/detailProduitAttentes`, produitAttente);

    const updateProduitAttente = (produitAttente) => apiClient.put(`/detailProduitAttentes`, produitAttente);

    const deleteProduitAttente = (produitAttenteId) => apiClient.delete(`/detailProduitAttentes/` + produitAttenteId);

    const saveChargeAttente = (chargeAttente) => apiClient.post(`/detailChargeAttentes`, chargeAttente);

    const updateChargeAttente = (chargeAttente) => apiClient.put(`/detailChargeAttentes`, chargeAttente);

    const deleteChargeAttente = (chargeAttenteId) => apiClient.delete(`/detailChargeAttentes/` + chargeAttenteId);

    const saveQualiteAttente = (qualiteAttente) => apiClient.post(`/detailQualiteAttentes`, qualiteAttente);

    const updateQualiteAttente = (qualiteAttente) => apiClient.put(`/detailQualiteAttentes`, qualiteAttente);

    const deleteQualiteAttente = (qualiteAttenteId) => apiClient.delete(`/detailQualiteAttentes/` + qualiteAttenteId);

    const saveDelaiAttente = (delaiAttente) => apiClient.post(`/detailDelaiAttentes`, delaiAttente);

    const updateDelaiAttente = (delaiAttente) => apiClient.put(`/detailDelaiAttentes`, delaiAttente);

    const deleteDelaiAttente = (delaiAttenteId) => apiClient.delete(`/detailDelaiAttentes/` + delaiAttenteId);






    return {
        getMetresByAvenantId,
        getProduitsByAvenantId,
        getLotsByProjectId,
        getTachesByAvenantId,
        saveAllProduits,
        saveAllLots,
        saveAllTaches,
        saveAvenant,
        updateAvenant,
        deleteAvenant,
        saveProjet,
        updateProjet,
        deleteProjet,
        saveLot,
        updateLot,
        deleteLot,
        saveProduit,
        updateProduit,
        deleteProduit,
        saveTache,
        updateTache,
        deleteTache,
        saveDetailProduit,
        updateDetailProduit,
        deleteDetailProduit,
        saveDetailCharge,
        updateDetailCharge,
        deleteDetailCharge,
        saveDetailQualite,
        updateDetailQualite,
        deleteDetailQualite,
        saveMetre,
        updateMetre,
        deleteMetre,
        saveProduitAttente,
        updateProduitAttente,
        deleteProduitAttente,
        saveChargeAttente,
        updateChargeAttente,
        deleteChargeAttente,
        saveQualiteAttente,
        updateQualiteAttente,
        deleteQualiteAttente,
        saveDelaiAttente,
        updateDelaiAttente,
        deleteDelaiAttente
    }
}



export default useCrudApi;