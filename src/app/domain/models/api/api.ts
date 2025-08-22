import { HttpHeaders, HttpParams } from '@angular/common/http';
import { signal, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

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


// * Metodos para manejar las rutas.
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


// * Metodos para manejar los status.
interface StatusConfig {
  label: string;
  severity:  'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';
  slug: string;
  field: string;
}
export class Status<T = StatusConfig> {
  public config: T;
  constructor(config: T){
    this.config = config;
  }
}

// * Metodos para manejar el store.
interface ContentData<T> {
    data: T | undefined;
    buffer: Record<string | number, T>;
}

interface HeaderSort<T = string> {
    header: T | undefined;
    order:
        | 'asc'
        | 'desc';
}
interface StoreConfig<
      T extends any = object,
      R extends string | undefined = undefined
    > {
    loading?: boolean;
    details?: ContentData<T>;
    paginator?: any;
    sort?: HeaderSort<R>;
    filters?: FormGroup;
}

export class Store<T = object, R extends string | undefined = undefined> {
  public loading: WritableSignal<boolean>;
  public details: WritableSignal<ContentData<T>>;
  public paginator: WritableSignal<any>;
  public sort: WritableSignal<HeaderSort<R>>;
  public filters: WritableSignal<FormGroup>;

  constructor(config?: Partial<StoreConfig<T, R>>) {
    this.loading = signal(false);
    this.details = signal({ data: undefined, buffer: {} });
    this.paginator = signal({});
    this.sort = signal({ header: undefined, order: 'asc' });
    this.filters = signal(new FormGroup({}));
     
    if(config){
      if (config.loading) this.loading.set(config.loading);
      if (config.details) this.details.set(config.details);
      if (config.paginator) this.paginator.set(config.paginator);
      if (config.sort) this.sort.set(config.sort);
      if (config.filters) this.filters.set(config.filters as FormGroup);
    }
  }
}





