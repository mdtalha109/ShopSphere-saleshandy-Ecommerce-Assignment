/**
 * API Client - HTTP Request Wrapper
 * Handles all HTTP communication with proper error handling
 */

import { ApiError, ApiResponse } from "@/src/types/api.types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          error: {
            message: data.error?.message || "An error occurred",
            code: data.error?.code || "UNKNOWN_ERROR",
            status: response.status,
          },
        } as ApiError;
      }

      return data;
    } catch (error) {
      // Network error or JSON parse error
      if (error instanceof TypeError) {
        throw {
          success: false,
          error: {
            message: "Network error. Please check your connection.",
            code: "NETWORK_ERROR",
            status: 0,
          },
        } as ApiError;
      }

      // Re-throw API errors
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient("/api");
