import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario!: Usuario;
  constructor() {
    this.usuario = {
      nombre: "cargando...",
      email: "cargando...",
      password: "algo",
      adm: false,
      avatar: "https://firebasestorage.googleapis.com/v0/b/prueba-438c5.appspot.com/o/avatares%2Fnobody.png?alt=media&token=4bd0b158-40fa-4957-a676-830f0601e36d",
      cliente: false,
      fotografo: false,
      organizador: false,
      fotos: []
    }
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
  }
}
