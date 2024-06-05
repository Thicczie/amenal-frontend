import React from "react";
import AchatElemInstance from "../AchatElemInstance";
import useAchatApi from "../../../api/achat/achat_api";

type Props = {};

const InstancesFrs: React.FC = (props: Props) => {
  const { getFournisseurs } = useAchatApi();
  return (
    <AchatElemInstance
      FetchFct={getFournisseurs}
      PathTo="/frs/info"
      tableName="frs"
    />
  );
};

export default InstancesFrs;
