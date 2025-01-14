import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Adicionando a configuração do HttpClient com fetch
const modifiedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withFetch()), // Configura o HttpClient para usar fetch
  ],
};

bootstrapApplication(AppComponent, modifiedAppConfig)
  .catch((err) => console.error(err));
