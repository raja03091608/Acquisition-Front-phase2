import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
