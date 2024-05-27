import { Provider } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {AuthInterceptorService} from "./services/auth-interceptor.service";

export const authInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true };
