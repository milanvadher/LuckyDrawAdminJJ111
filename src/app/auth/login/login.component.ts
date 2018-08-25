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

  constructor(private fb: FormBuilder, private api: RestApiService, private router: Router, private notification: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // phoneNumberPrefix: ['+91'],
      // remember: [ true ]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const data = {
        contactNumber: this.validateForm.value.contactNumber,
        password: this.validateForm.value.password
      };
      this.api.postequest('login', data).subscribe(res => {
        localStorage.setItem('userData', JSON.stringify(res));
        this.notification.success('Login Successful');
        this.router.navigateByUrl('/home');
        return res;
      }, err => {
        this.notification.error(err.error.err);
        return err;
      });
    }

  }

}
