import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagophotographer',
  templateUrl: './pagophotographer.component.html',
  styleUrls: ['./pagophotographer.component.scss']
})
export class PagophotographerComponent implements OnInit {
  pagoForm!: FormGroup;
  precio:number;
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

  realizarPagoFotografo(){
    if (this.pagoForm.valid) {
      this.pagos.pagarSuscripcionFotografo(this.precio);
      this.loading = true;
    } else {
      this.toastr.error('Suscripcion', 'Tarjeta rechazada, Revise sus datos de la tarjeta!');
    }
  }

  ngOnInit(): void {
   this.precio = Number(this.route.snapshot.paramMap.get('precio') || 0);
  }
}
