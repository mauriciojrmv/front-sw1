import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../interface/usuario';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  usuario!: Usuario;
  public file: any = {};
  loading = false;
  constructor(private userService: UserService, private router: Router, private storage: Storage, private zone: NgZone, private toastr: ToastrService) {
    this.formReg = new FormGroup({
      nombre: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      rol: new FormControl(),
    })
  }
  onSubmit(url: any) {
    this.userService.registerUsuarioFireAuth(this.formReg.value)
      .then(response => {
        this.userService.registerUsuarioFireStore(this.formReg.value, response.user.uid, url, this.file)
        this.zone.run(() => {
          this.toastr.success('Register', 'Ha Registrado Correctamente')
          this.router.navigate(['/login']);
        });
      })
      .catch(error => {
        this.loading = false;
        console.log(error)
        this.toastr.error('Register', 'Ha ocurrido un error con los datos');
      });
  }
  choseFile(event: any) {
    this.file = event.target.files[0];
  }
  addData() {
    // console.log(this.formReg.value);

    // this.userService.registerUsuarioFireStore(this.formReg.value, 'UUIDasdasdgadsgasd', 'URLasdfasdfasdfsadf', this.file)
    this.loading = true;
    const storageRef = ref(this.storage, `avatares/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
      console.log('upload is' + progress + '% done');
    }, (error) => {
      this.loading = false;
      this.toastr.error('Foto', 'Ha ocurrido un error con la foto');
      console.log(error.message);
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
          console.log('File available at', downLoadURL);
          this.onSubmit(downLoadURL);
        })
      }
    )
  }
  ngOnInit(): void {
  }
}
