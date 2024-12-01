import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [],
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.css'
})
export class PerfilAlumnoComponent implements OnInit {
  user: any;

  ngOnInit() {
    // Obtener los datos del usuario desde el localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      // Si no hay datos de usuario, redirigir a login
      console.error('No se encontraron datos de usuario.');
    }
  }
}