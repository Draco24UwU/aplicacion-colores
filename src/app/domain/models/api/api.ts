import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface APICallingData<T> {
  body: Partial<T>;
  headers: Record<string, string> | HttpHeaders;
  queryParams: Record<string, string | number | boolean> | HttpParams;
  pathParams: Record<string, string | number>;
  key?: string;
}
export interface APICommon {
  data: unknown;
  request: unknown;
  routes: string;
}
export interface APIResponse<T> {
  ok: boolean;
  error: boolean;
  data: T;
}
// * Interfaz para la ruta.
interface APIRouteBase {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
interface APIRouteLocal extends APIRouteBase {
  route: string;
}
interface APIRouteGlobal extends APIRouteBase {
  url: string;
}
export type APIRoute = APIRouteLocal | APIRouteGlobal;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function isLocal(route: APIRoute): route is APIRouteLocal {
  return 'route' in route;
}

class _Route<T = unknown> implements APIRouteBase {
  public method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

  constructor(config: APIRoute) {
    this.method = config.method;
  }

  declare __response?: T;
}

export class RouteLocal<T = unknown> extends _Route<T> {
  public route: string;

  constructor(config: { method: APIRouteBase['method']; route: string }) {
    super(config);
    this.route = config.route;
  }
}

export class RouteGlobal<T = unknown> extends _Route<T> {
  public url: string;

  constructor(config: { method: APIRouteBase['method']; url: string }) {
    super(config);
    this.url = config.url;
  }
}

export type Route<T = unknown> = RouteLocal<T> | RouteGlobal<T>;
