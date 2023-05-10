import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../../../interface/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario;
  constructor(private userService: UserService,
    private router: Router) {
    this.usuario = {
      nombre: "cargando...",
      email: "algo",
      password: "algo",
      adm: false,
      avatar: "https://firebasestorage.googleapis.com/v0/b/prueba-438c5.appspot.com/o/avatares%2Fnobody.png?alt=media&token=4bd0b158-40fa-4957-a676-830f0601e36d",
      cliente: false,
      fotografo: false,
      organizador: false,
      fotos: []
    }
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.userService.quitar_token_localStorage();
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
  }
  onCheckboxChange(event: any){
    if (event.target.checked) {
 
    }else{
    
    }    
  }

}
