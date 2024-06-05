import useApiClient from "../apiClient";


//c




const useAchatApi = () => {

    const apiClient = useApiClient();

    const getBesoins = () => apiClient.get("/besoins");
    const getBesoinsById = (id) => apiClient.get("/besoins/" + id);


    const getDemandesDevis = () => apiClient.get("/demandeDeviss");
    const getDemandesDevisById = (id) => apiClient.get("/demandeDeviss/" + id);

    const getDeviss = () => apiClient.get("/deviss");
    const getDevissById = (id) => apiClient.get("/deviss/" + id);

    const getCommandes = () => apiClient.get("/commandes");
    const getCommandesById = (id) => apiClient.get("/commandes/" + id);

    const getReceptions = () => apiClient.get("/receptions");
    const getReceptionsById = (id) => apiClient.get("/receptions/" + id);

    const getFactures = () => apiClient.get("/factures");
    const getFacturesById = (id) => apiClient.get("/factures/" + id);

    const getPaiements = () => apiClient.get("/paiements");
    const getPaiementsById = (id) => apiClient.get("/paiements/" + id);

    const getFournisseurs = () => apiClient.get("/fournisseurs");
    const getFournisseursById = (id) => apiClient.get("/fournisseurs/" + id);

    const getChargeStandards = () => apiClient.get("/chargeStandards");
    const getChargeStandardsById = (id) => apiClient.get("/chargeStandards/" + id);


    const getBanques = () => apiClient.get("/banques");

    const getComptesBanquaires = () => apiClient.get("/compteBanquaires");

    const getRemises = () => apiClient.get("/remises");

    const getTransports = () => apiClient.get("/transports");


    const getDetailCommandes = () => apiClient.get("/demandeDeviss");


    return {

        getBesoins,
        getBesoinsById,
        getDemandesDevis,
        getDemandesDevisById,
        getDeviss,
        getDevissById,
        getCommandes,
        getCommandesById,
        getReceptions,
        getReceptionsById,
        getFactures,
        getFacturesById,
        getPaiements,
        getPaiementsById,
        getFournisseurs,
        getFournisseursById,
        getChargeStandards,
        getChargeStandardsById,
        getBanques,
        getComptesBanquaires,
        getRemises,
        getTransports,
        getDetailCommandes
    }

}
export default useAchatApi;









