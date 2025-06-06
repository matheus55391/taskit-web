/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from "@/@types/api/api-response";
import { BaseApiService } from "@/services/base-api-service";
import { auth } from "@/lib/firebase";
import type { AxiosInstance, AxiosResponse } from "axios";
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

    private handleError(error: any): ErrorResponse {
        if (error?.response) {
            const { status, data } = error.response;
            return {
                status,
                message: data?.message || "Erro na requisição",
                errors: data?.errors || [data?.message || "Erro desconhecido"],
            };
        }

        return {
            status: 500,
            message: error?.message || "Erro inesperado",
            errors: [error?.message || "Erro desconhecido"],
        };
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

    private async request<TResponse>(
        method: "get" | "post" | "patch" | "put" | "delete",
        url: string,
        data?: any,
        headers?: Record<string, string>
    ): Promise<ApiResponse<TResponse>> {
        const _headers = await this.buildAuthHeaders(headers);
        try {
            const response: AxiosResponse<TResponse> = await this.api.request<TResponse>({
                method,
                url,
                data,
                headers: _headers,
            });
            return { status: response.status, data: response.data };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected get<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>("get", url, undefined, headers);
    }

    protected post<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse>("post", url, data, headers);
    }

    protected patch<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse>("patch", url, data, headers);
    }

    protected put<TRequest, TResponse>(url: string, data: TRequest, headers?: Record<string, string>) {
        return this.request<TResponse>("put", url, data, headers);
    }

    protected delete<TResponse>(url: string, headers?: Record<string, string>) {
        return this.request<TResponse>("delete", url, undefined, headers);
    }
}