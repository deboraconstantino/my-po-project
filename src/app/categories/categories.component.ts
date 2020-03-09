import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categoriesService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  edit(id) {
    this.router.navigate(["/edit-category", id], { relativeTo: this.activatedRoute });
  }
}