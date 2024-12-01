import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-tutor',
  standalone: true,
  imports: [],
  templateUrl: './perfil-tutor.component.html',
  styleUrl: './perfil-tutor.component.css'
})
export class PerfilTutorComponent implements OnInit {
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
