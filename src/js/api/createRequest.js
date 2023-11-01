const createRequest = async (options) => {
  const res = fetch(options.url, {
    method: options.method,
    body: JSON.stringify(options.body),
  });

  const result = await res;
  if (!result.ok) {
    const err = JSON.parse(await result.text());
    options.callback(false, err.message);
    return;
  }

  const response = await result.json();
  options.callback(true, response);
};

export default createRequest;
