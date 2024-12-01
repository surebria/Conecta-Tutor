import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { PerfilTutorComponent } from './perfil-tutor/perfil-tutor.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    { path: 'perfil-alumno', component: PerfilAlumnoComponent },
  { path: 'perfil-tutor', component: PerfilTutorComponent },
];
