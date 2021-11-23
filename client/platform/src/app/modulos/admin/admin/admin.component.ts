import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuarios = <any>[];
  constructor(private usuariosService: AdminService) {}
  
  ngOnInit(): void {
    this.usuariosService.get().subscribe((usuarios)=>{this.usuarios  = usuarios});
    this.getUsuariosFromAPI();
    console.log("paso por aca");
    console.log(this.usuarios);
  }
  getUsuariosFromAPI(){
    this.usuariosService.get().subscribe((response)=>{
      console.log('Response from API is',response);
    },(error)=>{
      console.log('Error:',error);
    } 
    )
  }

}
