import React, { useState } from "react";
import { QueryKey, useQuery } from "@tanstack/react-query";

import {
  getChartDataByAvenantIdAndTacheIds,
  getChartDataByAvenantIdAndLots,
  getChartDataByAvenantIdAndProduits,
  getChartDataByProjectIdAndLots,
  getChartDataByProjectIdAndProduits,
  getChartDataByProjectIdAndTacheIds,
  
} from '../api/chart_api'

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import LineChart from "./charts/LineChart";
import ChartsHeader from "./charts/ChartsHeader";
import BarChart from "./charts/BarChart";
import { useAppContext } from "../contexts/AppContext";
import { IonSpinner } from "@ionic/react";
import { useLocation } from "react-router-dom";



interface chartProps{
  tableRows:any[];
  avenantId:number|string|null|undefined;
  projectId:number|string|null|undefined;

}

// const Line = ({ avenantId, charge, tacheIds }) => {
const Chart:React.FC <chartProps> = ({tableRows , avenantId , projectId}) => {
  const [isCum, setIsCum] = useState(true);
  const [isQte, setIsQte] = useState(true);
  const [isPonc, setIsPonc] = useState(true);




  

  //TODO : change these values with the real ones



  const {currentCharge , currentSigma , currentTable }= useAppContext();

  //get chart data:
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["chartData", avenantId, currentCharge] as QueryKey,
    queryFn: () =>  loadChartData(avenantId, currentCharge , projectId)
  });



  const loadChartData = (avenantId: number|string|null|undefined, charge: string |null , projectId:number|string|null|undefined ) => {


    switch (currentTable) {
      case'produit':
      
      const designationsList :string[] = tableRows?.map((row: any) => row.designation);
      if (designationsList.length === 0) return null;
      if(currentSigma) return getChartDataByProjectIdAndProduits(projectId, charge , designationsList);
      return getChartDataByAvenantIdAndProduits(avenantId, charge , designationsList);
      case 'lot':

        const lotList:string [] = tableRows?.map((row: any) => row.lot);
      if (lotList.length === 0) return null;
      if(currentSigma) return getChartDataByProjectIdAndLots(projectId,charge,lotList)
      return getChartDataByAvenantIdAndLots(avenantId,charge,lotList)
      case 'tache':

      const tacheIds:number[]= tableRows?.map((row: any) => row.id);
      if (tacheIds.length === 0) return null;
      if(currentSigma)return getChartDataByProjectIdAndTacheIds(projectId,charge,tacheIds)
      return getChartDataByAvenantIdAndTacheIds(avenantId,charge,tacheIds)

      default : 
      break ;
    }


  }




  if ( isLoading) return <IonSpinner name="crescent" />;  
  if (isError) return <div>Error: {error.message}</div>;

  //prepare data for chart:
  let lineChartData: any = [];
  if (isCum && isQte && isPonc) {
    lineChartData.push(data?.data?.qteCumProduitPonctuelle);
    lineChartData.push(data?.data?.qteCumChargePonctuelle);
  } else if (!isCum && isQte && isPonc) {
    lineChartData.push(data?.data?.qteJourChargePonctuelle);
    lineChartData.push(data?.data?.qteJourProduitPonctuelle);
  } else if (!isCum && !isQte && isPonc) {
    lineChartData.push(data?.data?.mtJourChargePonctuelle);
    lineChartData.push(data?.data?.mtJourProduitPonctuelle);
  } else if (isCum && !isQte && isPonc) {
    lineChartData.push(data?.data?.mtCumChargePonctuelle);
    lineChartData.push(data?.data?.mtCumProduitPonctuelle);
  } else if (isCum && isQte && !isPonc) {
    lineChartData.push(data?.data?.qteCumChargeLisse);
    lineChartData.push(data?.data?.qteCumProduitLisse);
  } else if (!isCum && isQte && !isPonc) {
    lineChartData.push(data?.data?.qteJourChargeLisse);
    lineChartData.push(data?.data?.qteJourProduitLisse);
  } else if (!isCum && !isQte && !isPonc) {
    lineChartData.push(data?.data?.mtJourChargeLisse);
    lineChartData.push(data?.data?.mtJourProduitLisse);
  } else if (isCum && !isQte && !isPonc) {
    lineChartData.push(data?.data?.mtCumChargeLisse);
    lineChartData.push(data?.data?.mtCumProduitLisse);
  }

  const datesArray = data?.data?.labels ?? [];

  // Merge the arrays into an array of objects
  const mergedLineChartData = [["Days", "Charges", "Produits"]];
  const mergedBarChartData = [["Days", "Charges", "Produits"]];

  datesArray?.map((date: any, index: any) => {
    mergedLineChartData.push([
      date,
      lineChartData[0][index],
      lineChartData[1][index],
    ]);
  });

  const CurChart = () => {
    if (isCum) return <LineChart data={mergedLineChartData ?? [] } />;
    else return <BarChart data={mergedLineChartData ?? []} />;
  };

  return (
    <div className="  p-10 bg-white dark:bg-ion-dark rounded-3xl">
      <ChartsHeader title="BDG"  />
      <div className="w-full">
        <CurChart />
      </div>
      <div className="w-full mt-10 flex flex-row flex-wrap ">
        <div className="radiobutton-control">
          <FormControl component="fieldset">
            
            <RadioGroup
              aria-label="Cumulatif/Journaliere"
              name="isCum"
              value={isCum}
              onChange={(e) => setIsCum(e.target.value === "true")}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Cumulatif"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Journaliere"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="radiobutton-control">
          <FormControl component="fieldset">
            
            <RadioGroup
              aria-label="Ponctuelle/Lisse"
              name="isPonc"
              value={isPonc}
              onChange={(e) => setIsPonc(e.target.value === "true")}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Ponctuelle"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Lisse"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="radiobutton-control">
          <FormControl component="fieldset">
          
            <RadioGroup
              aria-label="Qte/Mantant"
              name="isQte"
              value={isQte}
              onChange={(e) => setIsQte(e.target.value === "true")}
            >
              <FormControlLabel value={true} control={<Radio />} label="Qte" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Mantant"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Chart;
