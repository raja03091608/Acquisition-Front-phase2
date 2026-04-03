import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
// import { TokenInterceptor } from './app/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // required for DI-based interceptors
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule),
    // providePrimeNG({ theme: { preset: Aura } }),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, // register interceptor
  ],
}).catch((err) => console.error(err));
