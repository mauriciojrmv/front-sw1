import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
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
  getDocs
} from '@angular/fire/firestore';
import { AuthUser } from '../interface/authUser';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccesToken } from '../interface/accestoken';
import { MyapiService } from './myapi.service';
import { RegisterFace } from '../interface/registerface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuario!: AccesToken;
  user!: Usuario;
  fotografos!: Usuario[];
  allUsers!: Usuario[];
  regFace!: RegisterFace;
  userFirebase!: Usuario;
  constructor(private router: Router, private auth: Auth, private firestore: Firestore, private myApi: MyapiService) {
    this.fotografos = [];
    this.allUsers = [];
  }
  registerUsuarioFireAuth(authUser: AuthUser) {
    return createUserWithEmailAndPassword(this.auth, authUser.email, authUser.password);
  }
  registerUsuarioFireStore(usuario: Usuario, uid: any, urlavatar: any, file: any) {
    this.userFirebase = usuario;
    this.userFirebase.avatar = urlavatar;
    this.userFirebase.fotos = [];
    this.userFirebase.ventas = [];
    switch (usuario.rol) {
      case "1":
        this.userFirebase.cliente = true;
        this.userFirebase.fotografo = false;
        this.userFirebase.organizador = false;
        this.userFirebase.adm = false;
        this.userFirebase.disponible = false;
        break;
      case "2":
        this.userFirebase.cliente = false;
        this.userFirebase.fotografo = true;
        this.userFirebase.organizador = false;
        this.userFirebase.adm = false;
        this.userFirebase.disponible = true;
        break;
      case "3":
        this.userFirebase.cliente = false;
        this.userFirebase.fotografo = false;
        this.userFirebase.organizador = true;
        this.userFirebase.adm = false;
        this.userFirebase.disponible = false;
        break;
      default:
        break;
    }
    this.userFirebase.phoneToken = "noToken";

    // console.log(this.userFirebase);


    //AQUI REGISTRAMOS LA CARA EN EL LUXAND
    this.myApi.registrarCara(this.userFirebase.nombre!, file).subscribe(response => {
      this.regFace = response as RegisterFace;
      this.userFirebase.uuid = this.regFace.body.uuid;
      const refDoc = doc(this.firestore, `usuarios/${uid}`)
      return setDoc(refDoc, this.userFirebase);
    })
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  grabar_token_localStorage(uid: any) {
    localStorage.setItem("uid", uid);
  }
  grabar_data_user_localStorage(uid: string) {
    this.getUser(uid).then(response => {
      this.usuario = {
        uid: uid,
        nombre: response.nombre,
        avatar: response.avatar,
        email: response.email,
        cliente: response.cliente,
        organizador: response.organizador,
        adm: response.adm,
        fotografo: response.fotografo
      };
      const usuarioString = JSON.stringify(this.usuario)
      localStorage.setItem("uid", usuarioString);
      this.router.navigate(['dashboard/eventos']);
    }).catch(error => {
      console.log(error);
    });
  }


  quitar_token_localStorage() {
    localStorage.clear();
  }

  async getUser(uid: string | null): Promise<any> {
    const docRef = doc(this.firestore, 'usuarios', uid!);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  async getFotosUser() {
    this.usuario = JSON.parse(localStorage.getItem("uid")!);
    const docRef = doc(this.firestore, 'usuarios', this.usuario.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = docSnap.data();
      return this.user.fotos;
    } else {
      return [];
    }
  }
  async getAllFotografos(): Promise<Usuario[] | undefined> {
    const colRef = collection(this.firestore, "usuarios");
    try {
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        this.fotografos.push(doc.data())
      })
      return this.fotografos;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  getIAllFotografosConUid(): Observable<Usuario[]> {
    const itemRef = collection(this.firestore, 'usuarios');
    return collectionData(itemRef, { idField: 'idField' }) as Observable<Usuario[]>;
  }
  async getAllUsers(): Promise<Usuario[] | undefined> {
    const colRef = collection(this.firestore, "usuarios");
    try {
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        this.allUsers.push(doc.data())
      })
      return this.allUsers;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  logout() {
    return signOut(this.auth);
  }
}
