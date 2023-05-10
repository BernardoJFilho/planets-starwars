const getApi = async () => {
  const URL_API = 'https://swapi.dev/api/planets';
  const response = await fetch(URL_API);
  const data = await response.json();
  const array = data.results.filter((param) => delete param.residents);
  return array;
};

export default getApi;
