import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
    console.log(this.categories)
  }

}
