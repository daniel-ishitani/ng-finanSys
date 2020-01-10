import { Category } from '../../categories/shared/category.model';

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public kind?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {}

  static kinds = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  get paidText(): string {
    return this.paid ? 'Paid' : 'Pending';
  }
}