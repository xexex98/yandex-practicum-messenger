type RequestMethod = (typeof Request)[keyof typeof Request];
type TData = Record<string, unknown>;

const Request = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

const BASE_URL = "https://ya-praktikum.tech/api/v2/";

function queryStringify(data: Record<string, unknown> = {}) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export default class HTTP {
  private _base;

  constructor(base: string = "") {
    this._base = BASE_URL + base;
  }

  get = (url: string, options: { data?: TData; timeout?: number } = {}) => {
    const urlWithQueryParams = url + queryStringify(options?.data);

    return this.request(urlWithQueryParams, { ...options, method: Request.GET }, options.timeout);
  };

  post = (url: string, options: { data?: TData; timeout?: number } = {}) =>
    this.request(url, { ...options, method: Request.POST }, options.timeout);

  put = (url: string, options: { data?: TData; timeout?: number } = {}) =>
    this.request(url, { ...options, method: Request.PUT }, options.timeout);

  delete = (url: string, options: { data?: TData; timeout?: number } = {}) =>
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

      xhr.open(method, this._base + url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = () => resolve(xhr);

      const handleError = (event: ProgressEvent<EventTarget>) => {
        return reject(new Error(`Error: ${event.type}`));
      };

      const handleOnReadyStateChange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status >= 400 && xhr.status < 500) {
            return reject(JSON.parse(xhr.responseText).reason);
          } else if (xhr.status >= 500 && xhr.status < 600) {
            return reject(JSON.parse(xhr.responseText).reason);
          }
        }
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;
      xhr.onreadystatechange = handleOnReadyStateChange;

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (method === Request.GET || !data) {
        xhr.send();
      } else if (data.formData instanceof FormData) {
        xhr.send(data.formData);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
