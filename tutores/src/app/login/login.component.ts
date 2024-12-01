import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    usuario: '',
    contrasena: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const url = 'http://localhost:3000/login'; // Endpoint del backend
    this.http.post(url, this.credentials).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert('Inicio de sesión exitoso.');
          // Guardar el token y los datos completos del usuario en el localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response)); // Guarda toda la información del usuario
  
          // Redirigir según el tipo de usuario
          if (response.tipo === 'alumno') {
            this.router.navigate(['/perfil-alumno']); // Redirigir a perfil alumno
          } else if (response.tipo === 'tutor') {
            this.router.navigate(['/perfil-tutor']); // Redirigir a perfil tutor
          }
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Error al iniciar sesión.');
      }
    });
  }
  
}