import { RestApiService } from './../../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: RestApiService, private router: Router, private notification: NzMessageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.router.navigateByUrl('home');
    }
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.api.postequest('adminLogin', this.validateForm.value).subscribe(res => {
        localStorage.setItem('userData', JSON.stringify(res));
        this.notification.success('Login Successful');
        this.router.navigateByUrl('home');
      }, err => {
        this.notification.error(err.error.err);
      });
    }

  }

}
