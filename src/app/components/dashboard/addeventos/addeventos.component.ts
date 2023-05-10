import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeventos',
  templateUrl: './addeventos.component.html',
  styleUrls: ['./addeventos.component.css']
})
export class AddeventosComponent implements OnInit {
  eventoForm: FormGroup;
  fotografos: Usuario[] | undefined;
  fotografosDisponibles: Usuario[] | undefined;
  telefono!: string
  loading=false;
  constructor(private eventoSerice: EventoService, private router: Router, private userService: UserService,private toastr: ToastrService) {
    this.fotografosDisponibles = [];
    this.eventoForm = new FormGroup({
      nombre: new FormControl(),
      lugar: new FormControl(),
      fecha: new FormControl(),
      tipo: new FormControl(),
      fotografo: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.userService.getIAllFotografosConUid().subscribe(response => {
      this.fotografos = response;
      this.fotografos!.forEach(element => {
        if (element.disponible) {
          this.fotografosDisponibles?.push(element);
        }
      });
    })

    // this.userService.getAllFotografos().then(response => {
    //   this.fotografos = response;
    //   this.fotografos!.forEach(element => {
    //     if (element.disponible) {
    //       this.fotografosDisponibles?.push(element);
    //     }
    //   });    
    // })
    // .catch(error => console.log(error));
  }

  crearEvento() {
    this.loading = true;
    this.eventoSerice.nuevoEvento(this.eventoForm.value).then(response=>{
      this.toastr.success('Crear Evento', 'successful');
      this.router.navigate(['/dashboard']);
    }).catch(e => {
      this.loading = false;
      this.toastr.error('Crear Evento', 'Algo salió mal intentelo de nuevo');
    });    
  }


}
