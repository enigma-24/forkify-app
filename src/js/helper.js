import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export async function sendJSON(url, uploadData) {
  try {
    const fetchPostRequest = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([
      fetchPostRequest,
      timeout(TIMEOUT_SECONDS),
    ]);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
}
