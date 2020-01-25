import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import currencyFormatter from "currency-formatter";
import { Category } from '../../categories/shared/category.model';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';
import { CategoryService } from '../../categories/shared/category.service';
import { CategoriesRoutingModule } from '../../categories/categories-routing.module';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  incomeTotal: any = 0;
  leftover: any = 0;

  expenseChartData: any;
  incomeChartData: any;

  chartOptions = {
    scales: {
      yAxess: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: Category[];
  entries: Entry[];

  @ViewChild('month', {static: true}) month: ElementRef = null;
  @ViewChild('year', {static: true}) year: ElementRef = null;

  months = [
    { value: '1', name: 'January'},
    { value: '2', name: 'February'},
    { value: '3', name: 'March'},
    { value: '4', name: 'April'},
    { value: '5', name: 'May'},
    { value: '6', name: 'June'},
    { value: '7', name: 'July'},
    { value: '8', name: 'August'},
    { value: '9', name: 'September'},
    { value: '10', name: 'October'},
    { value: '11', name: 'November'},
    { value: '12', name: 'December'},
  ];

  years = [
    { value: '2016', name: '2016'},
    { value: '2017', name: '2017'},
    { value: '2018', name: '2018'},
    { value: '2019', name: '2019'},
    { value: '2020', name: '2020'},
  ];

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  onGenerateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year) {
      alert("You must choose a month and a year to generate the reports.");
    }
    else{
      this.entryService.getByMonthAndYear(month, year).subscribe(
        this.setValues.bind(this)
      );
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateLeftover();
    this.setChartData();
  }

  private calculateLeftover(){
    let expenseTotal = 0;
    let incomeTotal = 0;

    this.entries.forEach(entry => {
      if(entry.kind == 'revenue') {
        incomeTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      }
      else {
        expenseTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.incomeTotal = currencyFormatter.format(incomeTotal, {code: 'BRL'});
    this.leftover = currencyFormatter.format(incomeTotal - expenseTotal, {code: 'BRL'});
  }

  private setChartData() {
    this.incomeChartData = this.getChartData('revenue', 'Income', '#ffff');
    this.expenseChartData = this.getChartData('expense', 'Expense', "#e03131");
  }

  private getChartData(entryKind: string, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(entry => 
        (entry.categoryId == category.id) && (entry.kind == entryKind)
      );

      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, {code: 'BRL'}), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)  
      }]
    };
  }
}
