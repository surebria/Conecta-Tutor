import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule,HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user = {
    nombre: '',
    apellidos: '',
    usuario: '',
    id: '',
    contrasena: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = 'http://localhost:3000/registro'; // Endpoint del backend
    this.http.post(url, this.user).subscribe({
      next: (response: any) => {
        alert(response.message || 'Usuario registrado con éxito.');
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario.');
      }
    });
  }
}