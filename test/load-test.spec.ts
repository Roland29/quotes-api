/**
 * The role of load testing is to assess the performance of the API.
 * It can help us ensure that our system meets the goals of concurrent users and requests per second.
 * It might be a good idea to run it as a part of a CI/CD pipeline.
 **/
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
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

export default () => {
  const res = http.post(`${__ENV.API_URL}/graphql`, JSON.stringify({ query }), {
    headers,
  });

  check(res, {
    'get quotes successfully': (response) => {
      return response.status === 200;
    },
  });

  sleep(1);
};
