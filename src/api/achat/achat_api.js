import apiClient from "../apiClient";

export const getBesoins = () => apiClient.get("/besoins");
export const getDemandesDevis = () => apiClient.get("/demandeDeviss");
export const getDeviss = () => apiClient.get("/deviss");
export const getCommandes = () => apiClient.get("/commandes");
export const getReceptions = () => apiClient.get("/receptions");
export const getFactures = () => apiClient.get("/factures");
export const getPaiements = () => apiClient.get("/paiements");
export const getFournisseurs = () => apiClient.get("/fournisseurs");
export const getChargeStandards = () => apiClient.get("/chargeStandards");
