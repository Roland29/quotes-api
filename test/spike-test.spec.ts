/**
 * When spike testing, we perform a stress test that spikes to an extreme load over a very short period.
 * By doing that, we can check how our system performs under a sudden heavy load and if it recovers once it subsides.
 * For example, imagine you’ve just aired a commercial for your company on one of the social media platforms.
 * By doing a spike test, we can check how our application can handle it.
 */
import { batch } from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 3000 },
    { duration: '3m', target: 3000 },
    { duration: '10s', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
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
