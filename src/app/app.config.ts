// import { ApplicationConfig } from '@angular/core';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeuix/themes/aura';

// export const appConfig: ApplicationConfig = {
//     providers: [
//         provideAnimationsAsync(),
//         providePrimeNG({
//             theme: {
//                 preset: Aura
//             }
//         })
//     ]
// };

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AppComponent } from './app.component';

console.log('APP CONFIG LOADED');

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(),
    //  providePrimeNG({ theme: { preset: Aura } })
    ],
});
