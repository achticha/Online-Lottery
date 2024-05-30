const config = {
  apiPath: 'http://localhost:3000',
  header: () => {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Lotto_token')
      },
    };
  },
    dataFormat: 'DD/MM/YYYY',
    dataTimeFormat: 'DD/MM/YYYY HH:mm',
    inputDataFormat: "YYYY/MM/DD",
    dateFormat: "YYYY-MM-DD",
};
export default config;