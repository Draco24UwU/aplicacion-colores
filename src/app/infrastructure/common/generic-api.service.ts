import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  APIResponse,
  APICallingData,
  Route,
  RouteLocal,
} from '../../domain/models/api/api';
import { firstValueFrom } from 'rxjs';
import { GenericCommon } from './generic.';

const apiUrl = 'g';
@Injectable({ providedIn: 'any' })
export class GenericApiService<
  TAPIs extends NonNullable<GenericCommon['api']>,
> {
  private readonly _http: HttpClient = inject(HttpClient);
  private $routes!: WritableSignal<TAPIs>;

  constructor() {
    console.log('AQUI PAPI');
    console.log(this._http);
  }

  public async request<
    TKey extends keyof TAPIs,
    TRoute extends TAPIs[TKey],
    TResponse = TRoute extends Route<infer R> ? R : never,
  >(api: TKey, data?: Partial<APICallingData<unknown>>): Promise<TResponse> {
    const { body, headers, queryParams, pathParams } = data || {};
    const $route = this.$routes()[api];

    //* Construir URL
    let url =
      $route instanceof RouteLocal ? `${apiUrl}${$route.route}` : $route.url;

    //* Modiciar los pathparams.
    if (pathParams) {
      Object.keys(pathParams).forEach(
        key => (url = url.replace(`:${key}`, `${pathParams[key]}`)),
      );
    }

    try {
      const preview = await firstValueFrom(
        this._http.request<APIResponse<TResponse>>($route.method, url, {
          body,
          headers,
          params: queryParams,
        }),
      );

      if (!preview?.ok) throw false;

      return data?.key
        ? (preview[data.key as keyof typeof preview] as TResponse)
        : preview.data;
    } catch (err) {
      throw err instanceof HttpErrorResponse ? err : false;
    }
  }

  public setRoutes(routes: TAPIs) {
    this.$routes = signal(routes);
  }
}

export function createApiService<T extends NonNullable<GenericCommon['api']>>(
  routes: T,
): GenericApiService<T> {
  const service = new GenericApiService<T>();
  service.setRoutes(routes);
  return service;
}
