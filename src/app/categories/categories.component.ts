import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PoDialogService, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poAlert: PoDialogService,
    private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  edit(id) {
    this.router.navigate(["/edit-category", id], { relativeTo: this.activatedRoute });
  }

  include() {
    this.router.navigate(["/form-categories"], { relativeTo:  this.activatedRoute });
  }

  openDialog(id) {
    this.poAlert.confirm({
      title: "Excluir categoria",
      message: "Confirma a exclusão da categoria?",
      confirm: () => this.removeCategory(id),
      cancel: () => this.refresh()
    });
  }

  refresh() {
    this.categoriesService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  removeCategory(id) {
    this.categoriesService.deleteCategory(id).subscribe(a => {
      this.poNotification.success("Categoria excluída com sucesso!"),
      this.refresh();
    });
  }
}