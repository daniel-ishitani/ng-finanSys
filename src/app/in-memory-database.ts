import {InMemoryDbService} from "angular-in-memory-web-api";

import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: "Leisure", description: "Cinema, parks, beach, ..."},
      { id: 2, name: "Health", description: "Health care"},
      { id: 3, name: "Salary", description: "Salary"},
      { id: 4, name: "Freelas", description: "Extraordinary income"}
    ];

    return categories;
  }
}