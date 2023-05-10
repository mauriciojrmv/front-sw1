import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = "https://fcm.googleapis.com/fcm/send"
  constructor(private http: HttpClient) { }
  notificarAppMovil() {
    const header = new HttpHeaders({
      'Authorization': 'key=AAAASjw368w:APA91bGeKlusCoyGdAI_vB6JqfEyB5RR016tDcOjw2iN6sqbJl5TnOwIsE0bFHDcBln9js3cD1YzHZLFCRcq7-VgmoXO6CanM4cDRIkUmPaGd87N_QSWd8dWucbVizh-LKgUixOpBBMp'
    });
    const data = {
      'to': "dt4Bvc-QQGSODXWYp2hUaV:APA91bH4pW9NJhwTgEHYvVZwmg8jc3iKYk8mXVLVcvMNmBPCklavnNe2lf-hUAz7c4asUSs_hAAmKZQIYF2ZbfICkBl3mSIeCAMTUvJpLF4s8fdFMx6nrCCJ5DoO26REhdDZXUuN6-qc",
      'direct_boot_ok': true,
      'notification': {
        'title': "Angular",
        'body': "Body desde Angular"
      },
      'data': {}
    }
    
    //return this.http.post(this.apiUrl,data,{header});
  }
}
