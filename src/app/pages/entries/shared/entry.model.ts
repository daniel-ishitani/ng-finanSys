import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Entry extends BaseResourceModel {
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
  ) {
    super();
  }

  static kinds = {
    expense: 'Expense',
    revenue: 'Revenue'
  };

  get paidText(): string {
    return this.paid ? 'Paid' : 'Pending';
  }
}