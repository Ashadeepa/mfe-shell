import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactAppComponent } from './react-app/react-app.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    {
      path: 'micro-app1',
      loadComponent: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4300/remoteEntry.js',
          exposedModule: './Component',
        }).then(m => m.AppComponent),
    },
    {
      path: 'micro-app2',
      loadComponent: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4400/remoteEntry.js',
          exposedModule: './Component',
        }).then(m => m.AppComponent),
    },
    { path: 'react-app', component: ReactAppComponent }, 

  ];
