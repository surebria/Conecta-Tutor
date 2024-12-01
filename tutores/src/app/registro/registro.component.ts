import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
    contrasena: '',
    tipo: 'alumno'
  };

  constructor(private http: HttpClient, private router: Router) {}
  onSubmit() {
    const url = 'http://localhost:3000/registro';
    this.http.post(url, this.user).subscribe({
      next: (response: any) => {
        alert(response.message || 'Usuario registrado con éxito.');
        this.router.navigate(['/login']); // Redirigir a login después de registro
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario.');
      }
    });
  }
}