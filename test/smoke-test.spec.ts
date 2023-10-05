/**
 * The idea behind smoke testing is to ensure our system can handle a minimal load. It might be worth running it as a sanity check.
 * The phrase smoke test originated from electronic hardware tests. If the device does not emit smoke when plugged in, it passes the smoke tests.
 **/
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
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
