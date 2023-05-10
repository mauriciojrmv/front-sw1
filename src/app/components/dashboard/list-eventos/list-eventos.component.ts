import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { Observable } from 'rxjs';
import { Evento } from '../../../interface/evento';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/interface/usuario';

@Component({
  selector: 'app-list-eventos',
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.css']
})
export class ListEventosComponent implements OnInit {
  usuario:Usuario;
  eventos!: Evento[];
  selection!: string[];
  filterNombre:string;
  constructor(private eventService: EventoService,private userService: UserService, private router: Router) {
    this.filterNombre ="";
    this.usuario = {
      nombre:"cargando...",
      email:"algo",
      password:"algo",
      adm:false,
      avatar:"https://firebasestorage.googleapis.com/v0/b/prueba-438c5.appspot.com/o/avatares%2Fnobody.png?alt=media&token=4bd0b158-40fa-4957-a676-830f0601e36d",
      cliente:false,
      fotografo:false,
      organizador: false,
      fotos:[]
    }
  }
  pasarFotos(fotos: any) {
    // console.log(fotos);
    this.router.navigate(['/dashboard/eventofotos']);
    this.eventService.disparadorDeFotos.emit(fotos);
  }


  newEvento() {
    //api de google para generar QR
    //https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl= 
  }

  ngOnInit(): void {
     this.usuario = JSON.parse(localStorage.getItem("uid")!);
    // this.eventService.getTodosLosEventos().then(response => {
    //   this.eventos = response!;
    //   console.log(this.eventos);
      
    // })
    // .catch(error => console.log(error));
    this.eventService.getIAllEventos().subscribe(response=>{
      this.eventos = response;
    })
  }



}
