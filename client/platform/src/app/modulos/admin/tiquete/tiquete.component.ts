import { Component, OnInit} from '@angular/core';
import { TiqueteService } from '../../../services/tiquete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiquete',
  templateUrl: './tiquete.component.html',
  styleUrls: ['./tiquete.component.scss']
})
export class TiqueteComponent implements OnInit {
  tiquetes = <any>[];
  
  constructor(
    private tiquetesService: TiqueteService,
    private router: Router
    ) {}
  
  ngOnInit(): void {
    this.tiquetesService.get().subscribe((tiquetes)=>{this.tiquetes  = tiquetes});
    this.gettiquetesFromAPI();
    console.log("paso por aca");
    console.log(this.tiquetes);
  }
  gettiquetesFromAPI(){
    this.tiquetesService.get().subscribe((response)=>{
      console.log('Response from API is',response);
    },(error)=>{
      console.log('Error:',error);
    } 
    )
  }
  delete(id: string): void {
    if (confirm('¿Esta seguro que quiere borrar este post?')) {
      this.tiquetesService.deleteTiquete(id).subscribe((res: any) => {
        this.tiquetes = this.tiquetes.filter((post: any) => post._id !== id);
      });
    }
  }

  editar(id : String){
    this.router.navigate(['tiquetes/' + id])
  }
}
