import { Axios, parseQuery } from '@Services/http';
import moment from "moment";

export const getOzUrl = ({
                           calKey = ''
                         }) => {
  return Axios.getRequest({
    url: `/api/v1/calculate/${calKey}`,
    requiresToken: true, // set access_token
  });
};
