import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage'
import { AccesToken } from 'src/app/interface/accestoken';
import { MyapiService } from 'src/app/services/myapi.service';
import { Face } from 'src/app/interface/face';
import { Usuario } from 'src/app/interface/usuario';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-eventofotos',
  templateUrl: './eventofotos.component.html',
  styleUrls: ['./eventofotos.component.css']
})
export class EventofotosComponent implements OnInit {
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;

  carrito: string[];
  fotos!: string[];
  uid!: string;
  usuario!: AccesToken;
  progreso: any;
  faceRespuesta!: Face;
  user!: Usuario;
  allUsers!: Usuario[] | undefined;
  public file: any = {};
  constructor(private eventService: EventoService,
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private myApi: MyapiService,
    private userService: UserService) {
    this.progreso = 0;
    this.carrito = [];
    this.allUsers = [];
  }
  get style() {
    return 'width:' + this.progreso + '%'
  }
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id') || '';
    this.eventService.getEvento(this.uid).then(response => {
      this.fotos = response.fotos;
    }).catch(error => {
      console.log(error);
    });
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
  }
  addImgAlStoreFB() {
    const storageRef = ref(this.storage, `images/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed', (snapshot) => {
      this.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error.message);
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
          this.fotos.unshift(downLoadURL);//al inicio
          this.eventService.updateEventoImg(this.fotos, this.uid);

          this.myApi.reconocimientoFoto(downLoadURL).subscribe(response => {
             this.faceRespuesta = response;
           // push a fluter siempre y cuando este vacio
              console.log(this.faceRespuesta);
            if (this.faceRespuesta.body!.length != 0) {
              this.userService.getAllUsers().then(response => {
                this.allUsers = response
                for (const user of this.allUsers!) {
                  if (user.uuid === this.faceRespuesta.body![0].uuid) {
                      if (user.phoneToken != "noToken") {
                        this.myApi.enviarNotificacion(user.phoneToken,downLoadURL,this.uid).subscribe(res =>{
                          console.log(res);
                        })
                        break;
                      }
                  }
                 }
              })
            }
          });
          this.myInputVariable.nativeElement.value = '';
          this.progreso = 0;
        })
      }
    )
  }
  choseFile(event: any) {
    this.file = event.target.files[0];
  }
  agregarAlCarrito(foto: string) {
    this.carrito.push(foto);
  }
  quitarUltimo() {
    this.carrito.pop();
  }
  cancelar() {
    this.carrito = [];
  }
  pasarFotos() {
    this.router.navigate(['/dashboard/confirmar', this.uid], { queryParams: { photos: this.carrito } })
  }
}
