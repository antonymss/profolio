import React, { useContext, useState } from "react";
import { Button } from "../../components";
import apiUrls from "../../config/backendApiUrlConfig";
import { AuthContext } from "../../store";

export function RequestTool() {
  const [response, setResponse] = useState("");
  const { auth } = useContext(AuthContext);

  function authorizationHeader() {
    if (!auth.keycloak) {
      return {};
    }
    return {
      headers: {
        Authorization: "Bearer " + auth.keycloak.token,
      },
    };
  }

  const sendRequest = async (url: string) => {
    try {
      const response = await fetch(url, authorizationHeader());
      if (response.status === 200) {
        const json = await response.json();
        setResponse(JSON.stringify(json, null, 2));
      } else {
        setResponse(
          JSON.stringify(
            { status: response.status, message: response.statusText },
            null,
            2
          )
        );
      }
    } catch (err: any) {
      setResponse(err.toString());
      console.log(err);
    }
  };

  const handleClickTest = async () => {
    await sendRequest(apiUrls.getUsersUrl);
  };

  const handleClickCustomerGetAllUrl = async () => {
    await sendRequest(apiUrls.customerGetAllUrl);
  };

  const handleClickCustomerDeleteOneUrl = async () => {
    await sendRequest(apiUrls.customerDeleteOneUrl);
  };

  return (
    <div className="QueryAPI">
      <h2>Requests </h2>
      <Button onClick={handleClickTest}>Test</Button>
      <Button onClick={handleClickCustomerGetAllUrl}>Get all customer</Button>
      <Button onClick={handleClickCustomerDeleteOneUrl}>
        Delete one customer
      </Button>
      <hr />
      <pre>{response || ""}</pre>
    </div>
  );
}
