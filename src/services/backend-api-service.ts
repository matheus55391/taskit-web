/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from "@/@types/api/api-response";
import { BaseApiService } from "@/services/base-api-service";
import { auth } from "@/lib/firebase";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { Auth } from "firebase/auth";
import { ErrorResponse } from "@/@types/api/error-response";

/**
 * Implementação concreta de um serviço de API com autenticação Firebase.
 */
export class BackendApiService extends BaseApiService {
    private firebaseAuth: Auth;

    constructor(api: AxiosInstance) {
        super(api);
        this.firebaseAuth = auth;
    }

    protected generateUrlWithParams<T extends object>(url: string, params: T) {
        const urlSearchParams = new URLSearchParams(
            Object.entries(params)
                .filter(([_, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                )
                .map(([key, value]) => [key, String(value)])
        );

        const queryString = urlSearchParams.toString();
        return queryString ? `${url}?${queryString}` : url;
    }

    private async getAuthHeaders(): Promise<{ Authorization: string }> {
        const token = await this.getToken();
        return { Authorization: `Bearer ${token}` };
    }

    private async getToken(): Promise<string> {
        const user = this.firebaseAuth.currentUser;
        if (!user) throw new Error("Usuário não autenticado");
        return await user.getIdToken();
    }

    private async buildAuthHeaders(headers?: Record<string, string>) {
        return { ...(await this.getAuthHeaders()), ...headers };
    }

    private async request<TResponse, TRequest = undefined>(
        method: "get" | "post" | "patch" | "put" | "delete",
        url: string,
        data?: TRequest,
        headers?: Record<string, string>
    ): Promise<ApiResponse<TResponse>> {
        const _headers = await this.buildAuthHeaders(headers);

        const config: AxiosRequestConfig = {
            method,
            url,
            headers: _headers,
            ...(data !== undefined && { data }),
        };

        const response: AxiosResponse<TResponse> = await this.api.request(config);
        return { status: response.status, data: response.data };

    }

    protected get<TResponse>(url: string, headers?: Record<string, string>) {
        return this.request<TResponse>("get", url, undefined, headers);
    }

    protected post<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse, TRequest>("post", url, data, headers);
    }

    protected patch<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse, TRequest>("patch", url, data, headers);
    }

    protected put<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse, TRequest>("put", url, data, headers);
    }

    protected delete<TResponse>(url: string, headers?: Record<string, string>) {
        return this.request<TResponse>("delete", url, undefined, headers);
    }
}