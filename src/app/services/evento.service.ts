import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  updateDoc,
  getDocs
} from '@angular/fire/firestore';
import { Evento } from '../interface/evento';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  @Output() disparadorDeFotos: EventEmitter<any> = new EventEmitter();
  eventos!:Evento[]

  constructor(private firestore: Firestore, private router:Router) {
    this.eventos = [];
  }
  getIAllEventos(): Observable<Evento[]> {
    const itemRef = collection(this.firestore, 'eventos');
    return collectionData(itemRef, { idField: 'id' }) as Observable<Evento[]>;
  }
  async getTodosLosEventos(): Promise<Evento[] | undefined>{
    const colRef = collection(this.firestore, "eventos");
    try {
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        this.eventos.push(doc.data());
      })
      return this.eventos
  } catch (error) {
        return [];
      console.log(error);
  }
  }
  async getEvento(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'eventos', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  nuevoEvento(evento: Evento) {
    const uid = this.generadorId();
    evento.qr = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" + uid;
    evento.fotos = [];
    //guardar en la BD firebase
    const refDoc = doc(this.firestore, `eventos/${uid}`)
    return setDoc(refDoc, evento);
  }

  generadorId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let autoId = ''
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return autoId
  }
  updateEventoImg(fotos: string[], idEvento: String) {
    const data = {
      fotos: fotos
    }
    const docRef = doc(this.firestore, `eventos/${idEvento}`);
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Se ha agregado un nuevo campo de documento a un documento existente");
      })
      .catch(error => {
        console.log(error);
      })
  }

}
