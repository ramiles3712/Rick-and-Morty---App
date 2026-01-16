import { describe, it, expect, vi, beforeEach } from "vitest";
import api, {
  getCharacters,
  getCharacterById,
  getEpisodes,
  getLocations,
} from "../../src/services/api";

// Mock axios
vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn(() => ({
        get: vi.fn(),
        interceptors: {
          request: { use: vi.fn(), eject: vi.fn() },
          response: { use: vi.fn(), eject: vi.fn() },
        },
      })),
    },
  };
});

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCharacters", () => {
    it("fetches characters successfully", async () => {
      const mockData = { results: [{ id: 1, name: "Rick" }] };
      api.get.mockResolvedValueOnce({ data: mockData });

      const result = await getCharacters(1, { name: "Rick" });
      expect(api.get).toHaveBeenCalledWith("/character", {
        params: { page: 1, name: "Rick" },
      });
      expect(result).toEqual(mockData);
    });

    it("handles 404 error by returning empty structure", async () => {
      const mockError = { response: { status: 404 } };
      api.get.mockRejectedValueOnce(mockError);

      const result = await getCharacters();
      expect(result).toEqual({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      });
    });

    it("throws other errors", async () => {
      const mockError = { response: { status: 500 } };
      api.get.mockRejectedValueOnce(mockError);

      await expect(getCharacters()).rejects.toEqual(mockError);
    });
  });

  describe("getCharacterById", () => {
    it("fetches character details successfully", async () => {
      const mockData = { id: 1, name: "Rick" };
      api.get.mockResolvedValueOnce({ data: mockData });

      const result = await getCharacterById(1);
      expect(api.get).toHaveBeenCalledWith("/character/1");
      expect(result).toEqual(mockData);
    });
  });

  describe("getEpisodes", () => {
    it("fetches episodes successfully", async () => {
      const mockData = { results: [{ id: 1, name: "Pilot" }] };
      api.get.mockResolvedValueOnce({ data: mockData });

      const result = await getEpisodes(1);
      expect(api.get).toHaveBeenCalledWith("/episode", { params: { page: 1 } });
      expect(result).toEqual(mockData);
    });

    it("handles 404 error", async () => {
      const mockError = { response: { status: 404 } };
      api.get.mockRejectedValueOnce(mockError);

      const result = await getEpisodes();
      expect(result).toEqual({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      });
    });

    it("throws other errors", async () => {
      const mockError = { response: { status: 500 } };
      api.get.mockRejectedValueOnce(mockError);

      await expect(getEpisodes()).rejects.toEqual(mockError);
    });
  });

  describe("getLocations", () => {
    it("fetches locations successfully", async () => {
      const mockData = { results: [{ id: 1, name: "Earth" }] };
      api.get.mockResolvedValueOnce({ data: mockData });

      const result = await getLocations(1);
      expect(api.get).toHaveBeenCalledWith("/location", {
        params: { page: 1 },
      });
      expect(result).toEqual(mockData);
    });

    it("handles 404 error", async () => {
      const mockError = { response: { status: 404 } };
      api.get.mockRejectedValueOnce(mockError);

      const result = await getLocations();
      expect(result).toEqual({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      });
    });

    it("throws other errors", async () => {
      const mockError = { response: { status: 500 } };
      api.get.mockRejectedValueOnce(mockError);

      await expect(getLocations()).rejects.toEqual(mockError);
    });
  });
});
