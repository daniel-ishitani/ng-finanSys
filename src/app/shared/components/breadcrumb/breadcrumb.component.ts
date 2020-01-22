import { Component, OnInit, Input } from '@angular/core';

interface BreadcrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: Array<BreadcrumbItem> = [];

  lastItem(item: BreadcrumbItem) {
    const index = this.items.indexOf(item);
    return index == (this.items.length - 1);
  }

  constructor() { }

  ngOnInit() {
  }

}
