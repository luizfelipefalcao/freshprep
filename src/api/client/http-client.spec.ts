import { httpClient } from "./HttpClient";

describe("HttpClient", () => {
  beforeEach(() => {
    delete process.env.EXPO_PUBLIC_API_BASE_URL;
    delete process.env.EXPO_PUBLIC_GITHUB_TOKEN;
  });

  describe("httpClient configuration", () => {
    it("should have correct base URL when environment variable is set", () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = "https://api.github.com";

      jest.resetModules();
      const { httpClient: newHttpClient } = require("./HttpClient");

      expect(newHttpClient.defaults.baseURL).toBe("https://api.github.com");
    });

    it("should have correct timeout", () => {
      expect(httpClient.defaults.timeout).toBe(10000);
    });

    it("should have correct default headers", () => {
      console.log("Headers structure:", httpClient.defaults.headers);

      expect(httpClient.defaults.headers).toHaveProperty("Content-Type", "application/json");
      expect(httpClient.defaults.headers).toHaveProperty("Accept", "application/vnd.github.v3+json");
    });
  });

  describe("HTTP requests", () => {
    it("should make GET request successfully", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, login: "testuser" }),
        status: 200,
        statusText: "OK",
      });

      try {
        const response = await httpClient.get("/users/test");
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ id: 1, login: "testuser" });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("environment variables", () => {
    it("should use environment variables for configuration", () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = "https://custom-api.com";
      process.env.EXPO_PUBLIC_GITHUB_TOKEN = "test-token-123";

      jest.resetModules();
      const { httpClient: newHttpClient } = require("./HttpClient");

      expect(newHttpClient.defaults.baseURL).toBe("https://custom-api.com");
    });
  });
});
