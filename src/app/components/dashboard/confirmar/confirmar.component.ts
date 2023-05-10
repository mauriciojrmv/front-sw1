import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AccesToken } from 'src/app/interface/accestoken';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent implements OnInit {
  fotos:string[];
  pagoForm!: FormGroup;
  precio:number
  envio:boolean
  uid!:string
  usuario!: AccesToken;
  loading=false;
  constructor(private route: ActivatedRoute, private pagos:PagosService,private fb: FormBuilder,private toastr: ToastrService) {
    this.envio = false
    this.fotos = [];
    this.precio = 0;
    this.pagoForm = this.fb.group({
      cardNumber: ['',[Validators.required]],
      cardHolderName:['',Validators.required],
      cardExpireDate: ['',Validators.required],
      cardSecurityNumbre:['',Validators.required],
      direccion:[''],
      telefono:[''],
    })

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((response:any) =>{
      this.fotos = response.photos;
      this.precio = this.fotos.length;
    })
    this.uid = this.route.snapshot.paramMap.get('id') || '';
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
  }
  confirmarPago(){
    const today = new Date();
    const now = today.toLocaleString();
    // console.log(this.pagoForm);

    if (this.pagoForm.valid) {
      const data = [{
        precio:this.precio,
        cliente:this.usuario.nombre,
        cantidad: this.fotos.length,
        direccion: this.pagoForm.get('direccion')?.value,
        telefono: this.pagoForm.get('telefono')?.value,
        fecha:now
      }]
      this.loading = true;
      this.pagos.pagarFotografo(this.uid,data,this.fotos)
    } else {
      this.toastr.error('Suscripcion', 'Tarjeta rechazada, Revise sus datos de la tarjeta!');
    }
  }
  onCheckboxChange(event: any){
    if (event.target.checked) {
      this.envio = true;
      this.precio = this.fotos.length + 5 + this.fotos.length*0.5
    }else{
      this.precio = this.fotos.length;
      this.envio = false;
    }
  }

}
