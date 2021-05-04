import axios from "axios";
import AWSCONSTANTS from "../aws-exports";
const apiUrl = AWSCONSTANTS.aws_appsync_graphqlEndpoint;
const headers = {
  "x-api-key": AWSCONSTANTS.aws_appsync_apiKey,
};

export async function axiosFun(query) {
  const res = await axios.post(apiUrl, query, {
    headers: headers,
  });
  return res.data;
}

