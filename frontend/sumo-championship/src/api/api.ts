/*
    This file contains the generic functions to interact with the backend API.
    The functions are:
        - get: to fetch data from the backend
        - getPaginated: to fetch data from the backend with pagination
        - post: to send data to the backend
        - delete_: to delete data from the backend
        - put: to update data in the backend
    */

const DOMAIN = 'http://localhost:8080/api/';

const throwFetchError = (
  method: string,
  endpoint: string,
  response: Response,
) => {
  throw new Error(`[${method}] ${endpoint}: ${response.statusText}`);
};

function get(endpoint: string, params = {}) {
  return async () => {
    let uri = `${DOMAIN}${endpoint}`;
    if (params) {
      uri = `${uri}?${new URLSearchParams(params)}`;
    }

    const response = await fetch(uri, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throwFetchError('GET', endpoint, response);
  };
}

function getPaginated(endpoint: string, size: number, params = {}) {
  return (pageParam: number) => {
    const paramsWithPagination = { page: pageParam, size, ...params };

    return get(endpoint, paramsWithPagination)();
  };
}

function post(endpoint: string, body = {}) {
  return async () => {
    const response = await fetch(`${DOMAIN}${endpoint}`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throwFetchError('POST', endpoint, response);
  };
}

function delete_(endpoint: string, body = {}) {
  return async () => {
    const response = await fetch(`${DOMAIN}${endpoint}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throwFetchError('DELETE', endpoint, response);
    }
  };
}

function put(endpoint: string, body = {}) {
  return async () => {
    const response = await fetch(`${DOMAIN}${endpoint}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throwFetchError('PUT', endpoint, response);
    }
  };
}

export default {
  get,
  getPaginated,
  post,
  delete_,
  put,
};
