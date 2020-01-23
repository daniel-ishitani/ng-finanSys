import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage(): string | null {
    if(this.formControl.invalid && this.formControl.touched) {
      return this.getErrorMessage();
    }
    return null;
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors.required) {
      return "Required field";
    }
    else if(this.formControl.errors.email) {
      return "Invalid email";
    }
    else if(this.formControl.errors.minlength){
      let min = this.formControl.errors.minlength.requiredLength;
      return `Must have at least ${min} chars`;
    }
    else if(this.formControl.errors.maxlength) {
      let max = this.formControl.errors.maxlength.requiredLength;
      return `Must have at most ${max} chars`;
    }
  }

}
