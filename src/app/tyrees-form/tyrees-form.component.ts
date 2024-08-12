import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tyrees-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tyrees-form.component.html',
  styleUrl: './tyrees-form.component.scss'
})
export class TyreesFormComponent {
  userName = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  })

  onSubmit() {
    window.alert(this.userName.value.firstName + " was just submitted");
    console.warn(this.userName.value);
  }
}
