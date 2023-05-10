import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../interface/usuario';
import {
  Firestore,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  getFirestore,
  getDoc,
  collection,
  serverTimestamp,
  updateDoc
} from '@angular/fire/firestore';
import { AccesToken } from '../interface/accestoken';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Evento } from '../interface/evento';
import { Venta } from '../interface/ventas';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  usuario!: AccesToken
  user!: Usuario
  evento!: Evento
  addVentas!: Venta[]
  constructor(private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService) {

  }

  pagarSuscripcionFotografo(monto: number) {
    const dbRef = collection(this.firestore, "pagos");
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
    const today = new Date();
    const now = today.toLocaleString();
    const data = {
      consepto: "Suscripcion Fotografo",
      correo: this.usuario.email,
      monto: monto,
      nombre: this.usuario.nombre,
      uid: this.usuario.uid,
      fecha: now
    };
    addDoc(dbRef, data)
      .then(docRef => {
        console.log("Document has been added successfully");
        this.editarRolusuarioAFotografo();
      })
      .catch(error => {
        console.log(error);
      })
  }

  private editarRolusuarioAFotografo() {
    const docRef = doc(this.firestore, "usuarios", this.usuario.uid);
    const data = {
      fotografo: true,
      cliente: false
    };
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Se ha editado satisfactoriamente");
        this.logout()
          .then(() => {
            this.quitar_token_localStorage();
            this.router.navigate(['/login']);
            this.toastr.success('Suscripcion', 'Su pago se ha procesado correctamente');
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      })
  }

  pagarSuscripcionOrganizador(monto: number) {
    const dbRef = collection(this.firestore, "pagos");
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
    const today = new Date();
    const now = today.toLocaleString();
    const data = {
      consepto: "Suscripcion Organizador",
      correo: this.usuario.email,
      monto: monto,
      nombre: this.usuario.nombre,
      uid: this.usuario.uid,
      fecha: now
    };
    addDoc(dbRef, data)
      .then(docRef => {
        console.log("Document has been added successfully");
        this.editarRolusuarioAOrganizador();
      })
      .catch(error => {
        console.log(error);
      })

  }
  private editarRolusuarioAOrganizador() {
    const docRef = doc(this.firestore, "usuarios", this.usuario.uid);
    const data = {
      organizador: true,
      cliente: false
    };
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Se ha editado satisfactoriamente");
        this.logout()
          .then(() => {
            this.quitar_token_localStorage();
            this.router.navigate(['/login']);
            this.toastr.success('Suscripcion', 'Su pago se ha procesado correctamente');
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      })
  }
  async pagarFotografo(uidEvento: string, venta: any, fotos: string[]) {
    console.log(uidEvento);

    const docRef = doc(this.firestore, 'eventos', uidEvento);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.evento = docSnap.data();
      console.log(this.evento.fotografo);
      const docRefe = doc(this.firestore, 'usuarios', this.evento.fotografo!);
      const docSnaps = await getDoc(docRefe);
      if (docSnaps.exists()) {
        this.user = docSnaps.data();
        if (this.user.ventas?.length != 0) {
          this.user.ventas!.forEach(element => {
            venta.push(element);
          });
        }
        const data = {
          ventas: venta
        }
        updateDoc(docRefe, data)
          .then(docRef => {
            this.pagarFotos(fotos);
            console.log("Se ha editado satisfactoriamente");
          })
          .catch(error => {
            console.log(error);
          })
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("No such document!");
    }
  }

  private async pagarFotos(fotos: string[]) {
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
    const docRef = doc(this.firestore, 'usuarios', this.usuario.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = docSnap.data();
      if (this.user.fotos?.length != 0) {
        this.user.fotos!.forEach(element => {
          fotos.push(element);
        });
      }
      const data = {
        fotos: fotos
      };
      updateDoc(docRef, data)
        .then(docRef => {
          console.log("Se ha editado satisfactoriamente");
          this.toastr.success('Comprar', 'Su pago se ha procesado correctamente');
          this.router.navigate(['/dashboard/myphotos']);
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      console.log("No such document!");
    }
  }
  private logout() {
    return signOut(this.auth);
  }
  private quitar_token_localStorage() {
    localStorage.clear();
  }


}

