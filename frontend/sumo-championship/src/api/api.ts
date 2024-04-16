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

const throwFetchError = (method: string, endpoint: string, text: string) => {
  throw new Error(`[${method}] ${endpoint}: ${text}`);
};

function get<T>(
  endpoint: string,
  params = {},
  accept = 'application/json',
  type = 'application/json',
): () => Promise<T> {
  return async () => {
    let uri = `${DOMAIN}${endpoint}`;
    if (params) {
      uri = `${uri}?${new URLSearchParams(params)}`;
    }

    const response = await fetch(uri, {
      method: 'Get',
      headers: {
        'Content-Type': type,
        accept,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throwFetchError('GET', endpoint, response.statusText);
  };
}

function getPaginated<T>(
  endpoint: string,
  size: number,
  params = {},
): (pageParam: number) => Promise<T> {
  return (pageParam: number) => {
    const paramsWithPagination = { page: pageParam, size, ...params };

    return get<T>(endpoint, paramsWithPagination)();
  };
}

function post<T>(endpoint: string, body = {}): () => Promise<T> {
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
    throwFetchError('POST', endpoint, response.statusText);
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
      throwFetchError('DELETE', endpoint, response.statusText);
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
      throwFetchError('PUT', endpoint, response.statusText);
    }
  };
}

export default {
  DOMAIN,
  get,
  getPaginated,
  post,
  delete_,
  put,
};
