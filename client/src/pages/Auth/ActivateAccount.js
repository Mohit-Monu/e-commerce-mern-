import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import AccountCreatedSuccess from "./AccountCreatedSuccess";
let count = 1;
const ActivateAccount = () => {
  const navigate = useNavigate();
  const [isloaded, setIsLoaded] = useState(true);
  const uuid = useParams().id;
  useEffect(() => {
    if (count === 1) {
      async function getData() {
        setIsLoaded(false);
        try {
          await axios.get("http://localhost:5000/user/activateaccount/" + uuid);
          setIsLoaded(true);
        } catch (err) {
          navigate("../pagenotfound");
        }
      }
      getData();
    }
    count++;
  }, []);
  return isloaded ? <AccountCreatedSuccess /> : <Spinner />;
};

export default ActivateAccount;
