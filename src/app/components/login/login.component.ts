import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UserService } from '../../services/user.service';
import { MyapiService } from '../../services/myapi.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading = false;
  constructor(private userService: UserService,private myapiService:MyapiService,private toastr: ToastrService) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit(): void {
      // const token = 'dt4Bvc-QQGSODXWYp2hUaV:APA91bH4pW9NJhwTgEHYvVZwmg8jc3iKYk8mXVLVcvMNmBPCklavnNe2lf-hUAz7c4asUSs_hAAmKZQIYF2ZbfICkBl3mSIeCAMTUvJpLF4s8fdFMx6nrCCJ5DoO26REhdDZXUuN6-qc';
      // this.myapiService.enviarNotificacion(token).subscribe(response=>{
      //   console.log(response);
      // })
  }
  onSubmit() {
    this.loading = true;
    this.userService.login(this.formLogin.value)
       
      .then(response => {
        this.userService.grabar_data_user_localStorage(response.user.uid);
        this.toastr.success('Login', 'Ha iniciado sesion Correctamente');
      })
      .catch(error =>{ 
        this.loading = false;
        this.toastr.error('Login', 'Ha ocurrido un error, revise sus credenciales');
        console.log(error)});
  }


}
