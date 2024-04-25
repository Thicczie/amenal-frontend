import apiClient from "../apiClient";

export const getBesoins = () => apiClient.get("/besoins");
export const getBesoinsById = (id) => apiClient.get("/besoins/" + id);


export const getDemandesDevis = () => apiClient.get("/demandeDeviss");
export const getDemandesDevisById = (id) => apiClient.get("/demandeDeviss/" + id);

export const getDeviss = () => apiClient.get("/deviss");
export const getDevissById = (id) => apiClient.get("/deviss/" + id);

export const getCommandes = () => apiClient.get("/commandes");
export const getCommandesById = (id) => apiClient.get("/commandes/" + id);

export const getReceptions = () => apiClient.get("/receptions");
export const getReceptionsById = (id) => apiClient.get("/receptions/" + id);

export const getFactures = () => apiClient.get("/factures");
export const getFacturesById = (id) => apiClient.get("/factures/" + id);

export const getPaiements = () => apiClient.get("/paiements");
export const getPaiementsById = (id) => apiClient.get("/paiements/" + id);

export const getFournisseurs = () => apiClient.get("/fournisseurs");
export const getFournisseursById = (id) => apiClient.get("/fournisseurs/" + id);

export const getChargeStandards = () => apiClient.get("/chargeStandards");
export const getChargeStandardsById = (id) => apiClient.get("/chargeStandards/" + id);


export const getBanques = () => apiClient.get("/banques");

export const getComptesBanquaires = () => apiClient.get("/compteBanquaires");

export const getRemises = () => apiClient.get("/remises");

export const getTransports = () => apiClient.get("/transports");










