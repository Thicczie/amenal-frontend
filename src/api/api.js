import { getApiClient } from "../hooks/useApiClient";

import useApiClient from "./apiClient";
import apisauceClient from "./auth/apisauceClient";


//To do: change localhost to your appropriate id

//const apiClient = getApiClient();

const useApi = () => {
  const apiClient = useApiClient();


  // ProjetInfos
  const getProjects = () => apiClient.get("/projects");
  const getTaches = () => apiClient.get("/taches");

  const getProjectById = (id) => apiClient.get("/projects/" + id);
  const getAvenantsByProjectId = (id) => apiClient.get("/avenants/project/" + id);
  const getAvenantById = (avenantId) => {
    return apiClient.get(`/avenants/${avenantId}`);
  };



  const figerProjet = (id) => apiClient.patch("/projects/figer/" + id);
  const validerProjet = (id) => apiClient.patch("/projects/valider/" + id);






  // ProduitTable
  const getSigmaProduitTable = (id, charge) => apiClient.get("/produitTable/project/" + id + "/charge/" + charge);
  const getProduitTableByAvenantId = (id, charge) => apiClient.get("/produitTable/avenant/" + id + "/charge/" + charge);

  // LotTable
  const getSigmaLotTable = (id, charge) => apiClient.get("/lotTable/project/" + id + "/charge/" + charge);
  const getLotTableByAvenantId = (id, charge) => apiClient.get("/lotTable/avenant/" + id + "/charge/" + charge);

  // TacheTable
  const getSigmaTacheTable = (id, charge) => apiClient.get("/tacheTable/project/" + id + "/charge/" + charge);
  const getTacheTableByAvenantId = (id, charge) => apiClient.get("/tacheTable/avenant/" + id + "/charge/" + charge);




  const getClients = () => apiClient.get("/clients");
  const getResponsables = () => apiClient.get("/personnels");

  return {
    getProjects,
    getTaches,
    getProjectById,
    getAvenantsByProjectId,
    getAvenantById,
    getSigmaProduitTable,
    getProduitTableByAvenantId,
    getSigmaLotTable,
    getLotTableByAvenantId,
    getSigmaTacheTable,
    getTacheTableByAvenantId,
    getClients,
    getResponsables,
    figerProjet,
    validerProjet
  }
}

export default useApi;
