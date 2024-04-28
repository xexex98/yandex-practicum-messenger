type RequestMethod = (typeof Request)[keyof typeof Request];

const Request = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

function queryStringify(data: Record<string, unknown> = {}) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  get = (url: string, options: { data?: Record<string, unknown>; timeout?: number } = {}) => {
    const urlWithQueryParams = url + queryStringify(options?.data);

    return this.request(urlWithQueryParams, { ...options, method: Request.GET }, options.timeout);
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

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);

      const handleError = (event: ProgressEvent<EventTarget>) =>
        reject(new Error(`Error: ${event.type}`));

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.timeout = timeout;
      xhr.ontimeout = handleError;

      if (method === Request.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
