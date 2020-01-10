import {InMemoryDbService} from "angular-in-memory-web-api";

import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: "Leisure", description: "Cinema, parks, beach, ..."},
      { id: 2, name: "Health", description: "Health care"},
      { id: 3, name: "Salary", description: "Salary"},
      { id: 4, name: "Freelas", description: "Extraordinary income"}
    ];

    const entries: Entry[] = [
      { id: 1, name: 'Magic', categoryId: categories[0].id, category: categories[0], paid: true, date: '01/01/2020', amount: '100,00', kind: 'expense', description: 'pre release'} as Entry,
      { id: 2, name: 'Magic', categoryId: categories[0].id, category: categories[0], paid: true, date: '01/01/2020', amount: '100,00', kind: 'expense', description: 'pre release'} as Entry
    ]

    return {categories, entries};
  }
}