import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import toastr from 'toastr';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  onSubmit() {
    this.submittingForm = true;

    if(this.currentAction == 'new') {
      this.createEntry();
    }
    else {
      this.updateEntry();
    }
  }

  get kindOptions(): Array<any> {
    return Object.entries(Entry.kinds).map(
      ([value, name]) => {
        return {
          value: value,
          name: name
        }
      }
    )
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    }
    else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      kind: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      )
      .subscribe(
        entry => {
          this.entry = entry;
          this.entryForm.patchValue(entry);
        },
        error => console.log(error)
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction == 'new') {
      this.pageTitle = 'New Entry';
    }
    else {
      const entryName = this.entry.name || '';
      this.pageTitle = "Editing entry: " + entryName;
    }
  }

  private createEntry() {
    const entry: Entry = Entry.fromJson(this.entryForm.value);

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private updateEntry() {
    const entry: Entry = Entry.fromJson(this.entryForm.value);

    this.entryService.update(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  //forced reload
  private actionsForSuccess(entry: Entry) {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    )
  }

  private actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação");
  
    this.submittingForm = false;

    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Communication failure. Please try again later."];
    }
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

}
