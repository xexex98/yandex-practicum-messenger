import { expect } from "chai";
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import HTTP, { Request } from "src/core/XMLHttpRequest";
import queryStringify from "src/helpers/query-stringify";

describe("HTTP class", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];
  const BASE_URL = "https://ya-praktikum.tech/api/v2/";
  const formData = new FormData();

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
    requests = [];
  });

  it("should make a GET request", async () => {
    const http = new HTTP();
    const data: Record<string, unknown> = { key: "value" };

    const promise = http.get("test", { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(Request.GET);
    expect(requests[0].url).to.equal(BASE_URL + "test?key=value");

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ success: true })
    );

    const response = await promise;

    expect(JSON.parse(response.responseText)).to.deep.equal({ success: true });
    expect(response.status).to.equal(200);
  });

  it("should make a POST request", async () => {
    const http = new HTTP();
    const data: Record<string, unknown> = { key: "value" };

    const promise = http.post("test", { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(Request.POST);
    expect(requests[0].url).to.equal(BASE_URL + "test");

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ success: true })
    );

    const response = await promise;

    expect(JSON.parse(response.responseText)).to.deep.equal({ success: true });
    expect(response.status).to.equal(200);
  });

  it("should handle errors correctly", async () => {
    const http = new HTTP();
    const data: Record<string, unknown> = { key: "value" };

    const promise = http.get("test", { data });

    expect(requests).to.have.length(1);
    requests[0].respond(
      500,
      { "Content-Type": "application/json" },
      JSON.stringify({ reason: "Server Error" })
    );

    try {
      await promise;
    } catch (error) {
      expect(error).to.equal("Server Error");
    }
  });

  it("should use the correct base URL", () => {
    const http = new HTTP("custom/base/");

    expect(http.baseURL()).to.equal(BASE_URL + "custom/base/");
  });

  describe("queryStringify", () => {
    it("should convert an object to a query string", () => {
      const result = queryStringify({
        key: 1,
        key2: "test",
        key3: false,
        key4: true,
        key5: [1, 2, 3],
        key6: { a: 1 },
        key7: { b: { d: 2 } },
      });

      expect(result).to.equal(
        "key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2"
      );
    });

    it("should return an empty string for an empty object", () => {
      const result = queryStringify({});

      expect(result).to.equal("");
    });
    it("formData test", async () => {
      const http = new HTTP();

      formData.append("key", "value");

      const promise = http.put("test", { data: { formData } });

      expect(requests[0].requestBody).to.be.equal(formData);

      requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({ success: true })
      );

      await promise;
    });
  });
});
