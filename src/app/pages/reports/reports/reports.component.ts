import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  onGenerateReports() {
    
  }
}
