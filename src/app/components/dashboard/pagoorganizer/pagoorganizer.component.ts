import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagoorganizer',
  templateUrl: './pagoorganizer.component.html',
  styleUrls: ['./pagoorganizer.component.scss']
})
export class PagoorganizerComponent implements OnInit {
  pagoForm!: FormGroup;
  precio:number
  loading = false;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private pagos: PagosService,
              private toastr: ToastrService) {
    this.pagoForm = this.fb.group({
      cardNumber: ['',[Validators.required]],
      cardHolderName:['',Validators.required],
      cardExpireDate: ['',Validators.required],
      cardSecurityNumbre:['',Validators.required]
    })
    this.precio = 0;
  }

  realizarPagoOrganizador(){
    if (this.pagoForm.valid) {
      this.loading = true;
      this.pagos.pagarSuscripcionOrganizador(this.precio);
    } else {
      this.toastr.error('Suscripcion', 'Tarjeta rechazada, Revise sus datos de la tarjeta!');
    }

    //console.log("Formulario llenado Correctamente");
    
  }

  ngOnInit(): void {
   this.precio = Number(this.route.snapshot.paramMap.get('precio') || 0);
  }

}
