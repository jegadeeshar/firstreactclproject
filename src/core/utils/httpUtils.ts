import api from '@core/interceptors/axiosInterceptor';
import type { AxiosRequestConfig } from 'axios';

/**
 * Sends a GET request to the specified URL and returns the response data.
 *
 * @template T - The expected type of the response data.
 * @param url - The URL to send the GET request to.
 * @param config - Optional Axios request configuration.
 * @returns A promise that resolves to the response data of type `T`.
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.get<T>(url, config);
  return response.data;
}

/**
 * Sends a POST request to the specified URL with the provided request body and optional Axios configuration.
 *
 * @template T - The expected response data type.
 * @template B - The type of the request body. Defaults to `unknown`.
 * @param url - The endpoint URL to which the POST request is sent.
 * @param body - The request payload to be sent in the POST request.
 * @param config - Optional Axios request configuration.
 * @returns A promise that resolves to the response data of type `T`.
 */
export async function post<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.post<T>(url, body, config);
  return response.data;
}

/**
 * Sends an HTTP PUT request to the specified URL with the provided request body and optional configuration.
 *
 * @template T - The expected response data type.
 * @template B - The type of the request body. Defaults to `unknown`.
 * @param url - The endpoint URL to send the PUT request to.
 * @param body - The request payload to be sent in the PUT request.
 * @param config - Optional Axios request configuration.
 * @returns A promise that resolves to the response data of type `T`.
 */
export async function put<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.put<T>(url, body, config);
  return response.data;
}

/**
 * Sends a DELETE request to the specified URL using the configured API client.
 *
 * @template T - The expected response data type.
 * @param url - The endpoint URL to send the DELETE request to.
 * @param config - Optional Axios request configuration.
 * @returns A promise that resolves with the response data of type `T`.
 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.delete<T>(url, config);
  return response.data;
}
