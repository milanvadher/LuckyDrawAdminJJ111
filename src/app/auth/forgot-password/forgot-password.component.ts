import { RestApiService } from './../../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: RestApiService, private router: Router, private notification: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      contactNumber: [null, [Validators.required]],
      // phoneNumberPrefix: ['+91', [Validators.required]],
      // remember: [ true ]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // if (this.validateForm.valid) {
    //   this.api.postequest('forgot-password', this.validateForm.value).subscribe(res => {
    //     localStorage.setItem('userData', JSON.stringify(res));
    //     this.notification.success('send OTP to your mobile number ' + this.validateForm.value.contactNumber);
    //     this.router.navigateByUrl('/login');
    //   }, err => {
    //     this.notification.error(err.error.err);
    //   });
    // }

    if (this.validateForm.valid) {
      this.notification.success('send OTP to your mobile number ' + this.validateForm.value.contactNumber);
      this.router.navigateByUrl('/login');
    }
  }

}
