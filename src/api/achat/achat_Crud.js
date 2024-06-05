import useApiClient from "../apiClient";



const useAchatCrud = () => {
    const apiClient = useApiClient();




    const saveBesoin = (bsn) => apiClient.post(`/besoins`, bsn);
    const saveDemandeDevis = (demandeDevis) => apiClient.post(`/demandeDeviss`, demandeDevis);
    const saveDevis = (devis) => apiClient.post(`/deviss`, devis);
    const saveCommande = (commande) => apiClient.post(`/commandes`, commande);
    const saveReception = (reception) => apiClient.post(`/receptions`, reception);
    const saveFacture = (facture) => apiClient.post(`/factures`, facture);
    const savePaiement = (paiement) => apiClient.post(`/paiements`, paiement);
    const saveFournisseur = (fournisseur) => apiClient.post(`/fournisseurs`, fournisseur);
    const saveChargeStandard = (chargeStandard) => apiClient.post(`/chargeStandards`, chargeStandard);
    const saveDetailReception = (detailReception) => apiClient.post(`/detailReceptions`, detailReception);


    const updateBesoin = (bsn) => apiClient.put(`/besoins`, bsn);
    const updateDemandeDevis = (demandeDevis) => apiClient.put(`/demandeDeviss`, demandeDevis);
    const updateDevis = (devis) => apiClient.put(`/deviss`, devis);
    const updateCommande = (commande) => apiClient.put(`/commandes`, commande);
    const updateReception = (reception) => apiClient.put(`/receptions`, reception);
    const updateFacture = (facture) => apiClient.put(`/factures`, facture);
    const updatePaiement = (paiement) => apiClient.put(`/paiements`, paiement);
    const updateFournisseur = (fournisseur) => apiClient.put(`/fournisseurs`, fournisseur);
    const updateChargeStandard = (chargeStandard) => apiClient.put(`/chargeStandards`, chargeStandard);
    const updateDetailReception = (detailReception) => apiClient.put(`/detailReceptions`, detailReception);


    const deleteBesoin = (bsnId) => apiClient.delete(`/besoins/` + bsnId);
    const deleteDemandeDevis = (demandeDevisId) => apiClient.delete(`/demandeDeviss/` + demandeDevisId);
    const deleteDevis = (devisId) => apiClient.delete(`/deviss/` + devisId);
    const deleteCommande = (commandeId) => apiClient.delete(`/commandes/` + commandeId);
    const deleteReception = (receptionId) => apiClient.delete(`/receptions/` + receptionId);
    const deleteFacture = (factureId) => apiClient.delete(`/factures/` + factureId);
    const deletePaiement = (paiementId) => apiClient.delete(`/paiements/` + paiementId);
    const deleteFournisseur = (fournisseurId) => apiClient.delete(`/fournisseurs/` + fournisseurId);
    const deleteChargeStandard = (chargeStandardId) => apiClient.delete(`/chargeStandards/` + chargeStandardId);
    const deleteDetailReception = (detailReceptionId) => apiClient.delete(`/detailReceptions/` + detailReceptionId);

    return {
        saveBesoin,
        saveDemandeDevis,
        saveDevis,
        saveCommande,
        saveReception,
        saveFacture,
        savePaiement,
        saveFournisseur,
        saveChargeStandard,
        saveDetailReception,
        updateBesoin,
        updateDemandeDevis,
        updateDevis,
        updateCommande,
        updateReception,
        updateFacture,
        updatePaiement,
        updateFournisseur,
        updateChargeStandard,
        updateDetailReception,
        deleteBesoin,
        deleteDemandeDevis,
        deleteDevis,
        deleteCommande,
        deleteReception,
        deleteFacture,
        deletePaiement,
        deleteFournisseur,
        deleteChargeStandard,
        deleteDetailReception

    }

}

export default useAchatCrud;