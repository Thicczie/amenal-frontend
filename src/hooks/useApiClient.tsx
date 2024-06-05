import { ApisauceInstance } from "apisauce";
import useApiClient from "../api/apiClient";

let apiClient: any = null;

function getApiFunctions() {
  if (!apiClient) {
    // Initialize once and cache the result
    apiClient = useApiClient();
  }
  return apiClient;
}

export function getApiClient() {
  const api = getApiFunctions();
  return {
    getBanques: api.getBanques,
    getBesoins: api.getBesoins,
    getChargeStandards: api.getChargeStandards,
    getDeviss: api.getDeviss,
    getFactures: api.getFactures,
    getFournisseurs: api.getFournisseurs,
    getPaiements: api.getPaiements,
    getReceptions: api.getReceptions,
    getRemises: api.getRemises,
    getTransports: api.getTransports,
    getClients: api.getClients,
    getProjects: api.getProjects,
    getResponsables: api.getResponsables,
    getTaches: api.getTaches,
    getLotsByProjectId: api.getLotsByProjectId,
    getMetresByAvenantId: api.getMetresByAvenantId,
    getProduitsByAvenantId: api.getProduitsByAvenantId,
  };
}
