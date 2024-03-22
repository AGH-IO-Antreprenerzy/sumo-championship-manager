function get(endpoint: string, params = {}) {
  return async () => {
    try {
      const uri =
        'http://localhost:8080/api/v1/season/all?page=0&size=6&historical=false';
      console.log(uri);
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

      throw new Error('[GET] Error fetching data: ' + response.statusText);
    } catch (error) {
      console.error(error);
    }
  };
}

function getPaginated(endpoint: string, size: number, params = {}) {
  return (pageParam: number) => {
    const paramsWithPagination = { page: pageParam, size, ...params };

    return get(endpoint, paramsWithPagination)();
  };
}

export default {
  get,
  getPaginated,
};
