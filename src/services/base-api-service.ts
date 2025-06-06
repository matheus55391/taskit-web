/* eslint-disable @typescript-eslint/no-unused-vars -- Requisitado pelo service */
import { ApiResponse } from "@/@types/api/api-response";
import type { AxiosInstance } from "axios";

/**
 * Classe abstrata base para serviços de API.
 */
export abstract class BaseApiService {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  protected async get<TResponse>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Método não implementado");
  }

  protected async post<TRequest, TResponse>(
    url: string,
    data: TRequest,
    headers?: Record<string, string>
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Método não implementado");
  }

  protected async patch<TRequest, TResponse>(
    url: string,
    data: TRequest,
    headers?: Record<string, string>
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Método não implementado");
  }

  protected async delete<TResponse>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Método não implementado");
  }

  protected async put<TRequest, TResponse>(
    url: string,
    data: TRequest,
    headers?: Record<string, string>
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Método não implementado");
  }
}