import apiClient from "../apiClient";


export const saveBesoin = (bsn) => apiClient.post(`/besoins`, bsn);
export const saveDemandeDevis = (demandeDevis) => apiClient.post(`/demandeDeviss`, demandeDevis);
export const saveDevis = (devis) => apiClient.post(`/deviss`, devis);
export const saveCommande = (commande) => apiClient.post(`/commandes`, commande);
export const saveReception = (reception) => apiClient.post(`/receptions`, reception);
export const saveFacture = (facture) => apiClient.post(`/factures`, facture);
export const savePaiement = (paiement) => apiClient.post(`/paiements`, paiement);
export const saveFournisseur = (fournisseur) => apiClient.post(`/fournisseurs`, fournisseur);
export const saveChargeStandard = (chargeStandard) => apiClient.post(`/chargeStandards`, chargeStandard);


export const updateBesoin = (bsn) => apiClient.put(`/besoins`, bsn);
export const updateDemandeDevis = (demandeDevis) => apiClient.put(`/demandeDeviss`, demandeDevis);
export const updateDevis = (devis) => apiClient.put(`/deviss`, devis);
export const updateCommande = (commande) => apiClient.put(`/commandes`, commande);
export const updateReception = (reception) => apiClient.put(`/receptions`, reception);
export const updateFacture = (facture) => apiClient.put(`/factures`, facture);
export const updatePaiement = (paiement) => apiClient.put(`/paiements`, paiement);
export const updateFournisseur = (fournisseur) => apiClient.put(`/fournisseurs`, fournisseur);
export const updateChargeStandard = (chargeStandard) => apiClient.put(`/chargeStandards`, chargeStandard);


export const deleteBesoin = (bsnId) => apiClient.delete(`/besoins/` + bsnId);
export const deleteDemandeDevis = (demandeDevisId) => apiClient.delete(`/demandeDeviss/` + demandeDevisId);
export const deleteDevis = (devisId) => apiClient.delete(`/deviss/` + devisId);
export const deleteCommande = (commandeId) => apiClient.delete(`/commandes/` + commandeId);
export const deleteReception = (receptionId) => apiClient.delete(`/receptions/` + receptionId);
export const deleteFacture = (factureId) => apiClient.delete(`/factures/` + factureId);
export const deletePaiement = (paiementId) => apiClient.delete(`/paiements/` + paiementId);
export const deleteFournisseur = (fournisseurId) => apiClient.delete(`/fournisseurs/` + fournisseurId);
export const deleteChargeStandard = (chargeStandardId) => apiClient.delete(`/chargeStandards/` + chargeStandardId);

