const Request = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

type RequestMethod = (typeof Request)[keyof typeof Request];

function queryParams(data: Record<string, unknown> = {}) {
  return data
    ? Object.entries(data)
        .map(([key, value]) => `${key}=${String(value)}`)
        .reduce((acc, item) => `${acc}${item}&`, "?")
        .slice(0, -1)
    : "";
}

export class HTTPTransport {
  get = (url: string, options: { data?: Record<string, unknown>; timeout?: number } = {}) => {
    const urlWithQuery = url + queryParams(options?.data);

    return this.request(urlWithQuery, { ...options, method: Request.GET }, options.timeout);
  };

  post = (url: string, options: { data?: Record<string, unknown>; timeout?: number } = {}) =>
    this.request(url, { ...options, method: Request.POST }, options.timeout);

  put = (url: string, options: { data?: Record<string, unknown>; timeout?: number } = {}) =>
    this.request(url, { ...options, method: Request.PUT }, options.timeout);

  delete = (url: string, options: { data?: Record<string, unknown>; timeout?: number } = {}) =>
    this.request(url, { ...options, method: Request.DELETE }, options.timeout);

  request = (
    url: string,
    options: {
      method: RequestMethod;
      data?: Record<string, unknown>;
      headers?: Record<string, string>;
    },
    timeout: number = 5000
  ) => {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });

      xhr.onload = () => resolve(xhr);

      const handleError = (event: ProgressEvent<EventTarget>) =>
        reject(new Error(`Error: ${event.type}`));

      xhr.timeout = timeout;

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === Request.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
