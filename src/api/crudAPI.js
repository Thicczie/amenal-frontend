import apiClient from "./apiClient";

export const getMetresByAvenantId = (id) => apiClient.get('metreAvs/avenant/' + id);

export const getProduitsByAvenantId = (id) => apiClient.get(`/produits/avenant/${id}`).then(response => response.data);

export const getLotsByProjectId = (id) => apiClient.get(`/lots/project/${id}`).then(response => response.data);

export const getTachesByAvenantId = (id) => apiClient.get(`/taches/avenant/${id}`).then(response => response.data);




export const saveAllProduits = (produits) => apiClient.post(`/produits/addAll`, produits);
export const saveAllLots = (lots) => apiClient.post(`/lots/addAll`, lots);
export const saveAllTaches = (taches) => apiClient.post(`/taches/addAll`, taches);


// CRUD AVENANT
export const saveAvenant = (avenant) => apiClient.post(`/avenants`, avenant);

export const saveProjet = (projet) => apiClient.post(`/projects`, projet);

// lots crud:
export const saveLot = (lot) => apiClient.post(`/lots`, lot);

export const updateLot = (lot) => apiClient.put(`/lots`, lot);

export const deleteLot = (lotId) => apiClient.delete(`/lots/` + lotId);

// produits crud:
export const saveProduit = (produit) => apiClient.post(`/produits`, produit);

export const updateProduit = (produit) => apiClient.put(`/produits`, produit);

export const deleteProduit = (produitId) => apiClient.delete(`/produits/` + produitId);

// taches crud:
export const saveTache = (tache) => apiClient.post(`/taches`, tache);

export const updateTache = (tache) => apiClient.put(`/taches`, tache);

export const deleteTache = (tacheId) => apiClient.delete(`/taches/` + tacheId);

// CRUD DETAILS

// detailProduit crud:
export const saveDetailProduit = (detailProduit) => apiClient.post(`/detailProduits`, detailProduit);

export const updateDetailProduit = (detailProduit) => apiClient.put(`/detailProduits`, detailProduit);

export const deleteDetailProduit = (detailProduitId) => apiClient.delete(`/detailProduits/` + detailProduitId);

// detailCharge crud:
export const saveDetailCharge = (detailCharge) => apiClient.post(`/detailCharges`, detailCharge);

export const updateDetailCharge = (detailCharge) => apiClient.put(`/detailCharges`, detailCharge);

export const deleteDetailCharge = (detailChargeId) => apiClient.delete(`/detailCharges/` + detailChargeId);
// detailQualite crud:
export const saveDetailQualite = (detailQualite) => apiClient.post(`/detailQualites`, detailQualite);

export const updateDetailQualite = (detailQualite) => apiClient.put(`/detailQualites`, detailQualite);

export const deleteDetailQualite = (detailQualiteId) => apiClient.delete(`/detailQualites/` + detailQualiteId);
