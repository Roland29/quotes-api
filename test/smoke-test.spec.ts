import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 1,
  duration: '10s',
};

const query = `
query Quotes {
    quotes {
        _id
        author
    }
}
`;

const headers = {
  'Content-Type': 'application/json',
  'api-key': `${__ENV.API_KEY}`,
};

export default function () {
  const res = http.post(`${__ENV.API_URL}/graphql`, JSON.stringify({ query }), {
    headers,
  });
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
