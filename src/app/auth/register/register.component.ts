import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { RestApiService } from './../../rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private api: RestApiService, private router: Router, private notification: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    //   this.api.postequest('login', this.validateForm.value).subscribe(res => {
    //     localStorage.setItem('userData', JSON.stringify(res));
    //     this.notification.success('Register Successfully');
    //     this.router.navigateByUrl('/login');
    //   }, err => {
    //     this.notification.error(err.error.err);
    //   });
    // }

    if (this.validateForm.valid) {
      this.notification.success('Register Successfully');
      this.router.navigateByUrl('/login');
    }

  }

}
