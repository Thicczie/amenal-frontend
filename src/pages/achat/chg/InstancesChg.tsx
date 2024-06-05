import React from "react";
import AchatElemInstance from "../AchatElemInstance";
import useAchatApi from "../../../api/achat/achat_api";

type Props = {};

const InstancesChg: React.FC = (props: Props) => {
  const { getChargeStandards } = useAchatApi();
  return (
    <AchatElemInstance
      FetchFct={getChargeStandards}
      PathTo="/chg/info"
      tableName="chg"
    />
  );
};

export default InstancesChg;
