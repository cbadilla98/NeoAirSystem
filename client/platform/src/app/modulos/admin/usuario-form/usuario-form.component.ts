import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  postForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', Validators.required),
  });

  constructor(
    private adminService: AdminService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  editMode = false;
  post: any = {};

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;

        this.adminService.getById(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            nombre: data.nombre,
            correo: data.correo,
          });
        });
      }
    });
  }

  navigateToList() {
    this.router.navigate(['/dashboard/blog/list']);
  }

  submitForm() {
    console.log("paso por aca 1");
    if (this.postForm.valid) {
      console.log("paso por aca2 ");
      if (this.editMode) {
        console.log("paso por aca 3");
        this.adminService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            this.navigateToList();
          });
      } else {
        console.log("paso por aca 4");
        this.adminService.create(this.postForm.value).subscribe((data) => {
          this.navigateToList();
        });
      }
    }
  }
}
