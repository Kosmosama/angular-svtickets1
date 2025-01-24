import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './shared/interceptors/base-url.interceptor';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideGoogleId } from './auth/google-login/google-login.config';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(), 
        provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
        provideClientHydration(withEventReplay()),
        provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor]), withFetch()),
        provideGoogleId("746820501392-oalflicqch2kuc12s8rclb5rf7b1fist.apps.googleusercontent.com"),
        importProvidersFrom(SweetAlert2Module.forRoot()),
        provideAnimationsAsync(),
    ]
};
