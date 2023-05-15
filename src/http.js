const HOST = '194.62.19.60:3000';
//'194.62.19.60:3000';
// '192.168.100.7:5000';
//'194.62.19.60:3000';
//'194.62.19.60:3000';
//'192.168.100.7:5000';
//'194.62.19.60:3000';

const post = (url, data) => {
  return fetch('http://' + HOST + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }).then((response) => response.json());
};

const put = (url, data, parse = true) => {
  return fetch('http://' + HOST + url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }).then((response) => (parse ? response.json() : response));
};

const get = (url) => {
  console.log('get ', 'http://' + HOST + url);

  return fetch('http://' + HOST + url).then((response) => response.json());
};

export default {
  post,
  get,
  put,
};
