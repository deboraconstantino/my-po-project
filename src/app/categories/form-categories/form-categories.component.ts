import { Component, OnInit } from "@angular/core";
import { PoComboOption, PoNotificationService } from "@portinari/portinari-ui";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { map, switchMap } from "rxjs/operators";
import { Category } from "../category.model";
import { CategoriesService } from "../categories.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-form-categories",
  templateUrl: "./form-categories.component.html",
  styleUrls: ["./form-categories.component.css"]
})
export class FormCategoriesComponent implements OnInit {
  formCategories: FormGroup;
  submitted: boolean = false;

  categories: Category = {
    id: "",
    name: "",
    status: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private poNotification: PoNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formCategories = this.formBuilder.group({
      id: [this.categories.id],
      name: [this.categories.name, Validators.required],
      status: [this.categories.status, Validators.required]
    });

    this.activatedRoute.params
      .pipe(
        map((params: any) => params["id"]),
        switchMap(id => this.categoriesService.getCategoriesById(id))
      )
      .subscribe(category => {
        this.updateForm(category);
      });
  }

  public readonly options: Array<PoComboOption> = [
    { label: "Habilitada", value: "Habilitada" },
    { label: "Desabilitada", value: "Desabilitada" }
  ];

  onSubmit() {
    this.submitted = true;

    if (this.formCategories.valid) {
      if (this.formCategories.value.id) {
        this.updateCategory();
      } else if (!this.formCategories.value.id) {
        this.inputCategory();
      }
    } else {
      this.poNotification.error(
        "Por favor, preencher nome e status da categoria!"
      );
    }
  }

  updateForm(category) {
    this.formCategories.patchValue({
      id: category.id,
      name: category.name,
      status: category.status
    });
  }

  inputCategory() {
    this.categoriesService
      .postCategories(this.formCategories.value)
      .subscribe(a =>
        this.poNotification.success("Categoria incluída com sucesso!")
      );
  }

  updateCategory() {
    this.categoriesService
      .putCategory(this.formCategories.value)
      .subscribe(a =>
        this.poNotification.success("Categoria alterada com sucesso!")
      );
  }

  close() {
    this.router.navigate(["/categories"]);
  }
}
