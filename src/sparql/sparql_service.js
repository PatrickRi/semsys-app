import axios from 'axios';
import * as constants from './sparql_utils';

export default function query(query, endpoint=constants.SPARQL_ENDPOINT) {
  const queryUrl = endpoint+"?query="+ encodeURIComponent(query) +"&format=json";
  return axios.get(queryUrl);
}
