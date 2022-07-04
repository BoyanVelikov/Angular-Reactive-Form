import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form-reactive',
  templateUrl: './register-form-reactive.component.html',
  styleUrls: ['./register-form-reactive.component.css']
})
export class RegisterFormReactiveComponent implements OnInit {
  registerForm!: FormGroup;

  passwordOne = '';
  passwordTwo = '';

  prefixes: string[] = [
    '+971',
    '+972',
    '+973'
  ];
  defaultPrefix = this.prefixes[0];

  buildings: string[] = [
    'building 1',
    'building 2',
    'building 3'
  ];
  defaultBuilding = this.buildings[0];

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern('[A-Z]{1}[a-z]+[ ][A-Z]{1}[a-z]+')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'prefix': new FormControl(this.defaultPrefix),
      'tel': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{9}')]),
      'building': new FormControl(this.defaultBuilding),
      'passData': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{3,16}')]),
        're-password': new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]{3,16}')])
      })
    }, [this.checkPasswords.bind(this)]);
    this.registerForm.get('passData')?.valueChanges.subscribe(
      value => {
        this.passwordOne = value['password'];
        this.passwordTwo = value['re-password']
      }
    )
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.registerForm.reset();
    this.registerForm.patchValue({
      prefix: this.defaultPrefix,
      building: this.defaultBuilding
    })
  }

  checkPasswords() {
    if(this.passwordOne !== this.passwordTwo) {
      return {'passwordMissmatch': true}
    };
    return null;
  }

}
