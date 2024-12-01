import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = 'http://localhost:3000/login'; // Endpoint del backend
    this.http.post(url, this.credentials).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert('Inicio de sesión exitoso.');
          // Guardar token o redirigir al usuario
          localStorage.setItem('token', response.token); // Ejemplo
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