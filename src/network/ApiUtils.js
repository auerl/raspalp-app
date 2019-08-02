import axios from 'axios';
import utf8 from 'utf8';

export const CallAPI = (requireConfig = {}, onSuccess, onError) => {
  const config = {
    ...requireConfig,
    url: encodeURI(requireConfig.url),
    timeout: 30000,
  };
  const request = axios(config)
  .then(response => onSuccess(response))
  .catch(error => onError(error));
  return request;
};

export const ApiCall = (url, method, payload={}, extraHeaders={}, onSuccess, onError) => {
  let data = {
    method: method,
    headers: {
      ...extraHeaders,
    },
  }
  // get doesn't allow to send a body
  if (method != 'GET') {
    data.body = JSON.stringify(payload);
  }
  if (method == 'POST' || method == 'PUT') {
    data.headers['Accept'] = 'application/json'
    data.headers['Content-Type'] = 'application/json'
  }
  const request = fetch(url, data)
    .then(response => response.json())
    .then(responseData => onSuccess(responseData))
    .catch(error => onError(error));
  return request;
};

export const ApiPostJSON = (url, payload={}, onSuccess, onError) => {
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }
  const request = fetch(url, data)
  .then(response => response.json())
  .then(responseData => onSuccess(responseData))
  .catch(error => onError(error));
  return request;
};
