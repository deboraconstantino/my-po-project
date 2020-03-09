import { Component, OnInit } from '@angular/core';
import { PoComboOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.css']
})
export class FormCategoriesComponent implements OnInit {
  formCategories: FormGroup;
  submitted: boolean = false;

  categories: Category = {
    id: "",
    name: "",
    status: ""
  }

  constructor(private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private poNotification: PoNotificationService,
    private router: Router) { }

  ngOnInit() {
    this.formCategories = this.formBuilder.group({
      id: [this.categories.id],
      name: [this.categories.name, Validators.required],
      status: [this.categories.status, Validators.required]
    })
  }

  public readonly options: Array<PoComboOption> = [
    { label: 'Habilitado', value: 'enabled' },
    { label: 'Desabilitado', value: 'desabled' }
  ];

  onSubmit() {
    this.submitted = true;

    if(this.formCategories.valid) {
      this.categoriesService.postCategories(this.formCategories.value)
      .subscribe(
        a => this.poNotification.success("Categoria incluída com sucesso!")
      )
    }
  }

  close() {
    this.router.navigate(["/categories"]);
  }
}