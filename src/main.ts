import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// import { Amplify } from 'aws-amplify';

// Amplify.configure({
//   Auth: {
//     region: 'us-east-1', // Região do seu Cognito
//     userPoolId: 'us-east-1_XXXXXX', // ID do User Pool
//     userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXX', // ID do App Client
//   },
// });

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
