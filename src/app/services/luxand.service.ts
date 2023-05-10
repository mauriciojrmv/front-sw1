import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LuxandService {
  private options = {
    method: 'GET',
    url: "https://api.luxand.cloud/subject",
    urlPost: "https://api.luxand.cloud/subject/v2",
    urlsearch:"https://api.luxand.cloud/photo/search",
    qs: {},
    headers: {
      'token': "38c466edd5f14894950fa82570c8da5d"
    }
  }
  // options: {
  //   headers?: HttpHeaders | { [header: string]: string | string[]; };
  //   observe?: 'body' | 'events' | 'response';
  //   params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  //   reportProgress?: boolean;
  //   responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  //   withCredentials?: boolean;
  // } | undefined
  header:HttpHeaders;
  opciones:any
  //params!: HttpParams;
  constructor(private http: HttpClient) { 
    
    this.header = new HttpHeaders({
      'token': "38c466edd5f14894950fa82570c8da5d"
    });
    this.opciones = {
      headers: this.header
    }
  }

  getListPersona(){
    return this.http.get(this.options.url,this.opciones);
  }
  //id 298367   unica persona creada 
  getListFacePersona(id:string){
    return this.http.get(this.options.url+`/${id}`,this.opciones)
  }

  createPersona(data:any){
    const head:HttpHeaders = new HttpHeaders({
      'token': "38c466edd5f14894950fa82570c8da5d"
    })
    const newData:HttpParams = new HttpParams(data)
    
    const opc = {
      headers: head,
      params: newData
    }
    return this.http.post(this.options.urlPost,opc)
  }
  reconocimientoFoto(){
    const opc = {
      headers: this.header,
      data: "https://firebasestorage.googleapis.com/v0/b/prueba-438c5.appspot.com/o/images%2Fbianca3.jpg?alt=media&token=73a38573-9907-47e2-8e1a-dbcba4c2430d"
    }
    return this.http.post(this.options.urlsearch,opc)
  }


  public getPokemon(url:string){
    return this.http.get(url);
  }

}
