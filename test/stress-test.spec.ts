import { batch } from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 700 },
    { duration: '5m', target: 700 },
    { duration: '10m', target: 0 },
  ],
};

const query = `
query Quotes {
    quotes {
        _id
        author
    }
}
`;

const query2 = `
query Quote {
    quote(id: "65030423e4da627f700d320c") {
        _id
        author
        content
        createdAt
        updatedAt
    }
}
`;

const headers = {
  'Content-Type': 'application/json',
  'api-key': `${__ENV.API_KEY}`,
};

const req1 = {
  method: 'POST',
  url: `${__ENV.API_URL}/graphql`,
  body: JSON.stringify({ query }),
  params: { headers },
};

const req2 = {
  method: 'POST',
  url: `${__ENV.API_URL}/graphql`,
  body: JSON.stringify({ query: query2 }),
  params: { headers },
};

export default () => {
  batch([req1, req2]);

  sleep(1);
};
