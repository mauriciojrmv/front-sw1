import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.component.html',
  styleUrls: ['./myphotos.component.css']
})
export class MyphotosComponent implements OnInit {
  misFotos?:string[];
  constructor(private userService:UserService) { }
  ngOnInit(): void {
    this.userService.getFotosUser().then((response) => {
      this.misFotos = response;
    })
    .catch(error => console.log(error));
  }

}
