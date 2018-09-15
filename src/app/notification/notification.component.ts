import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, public api: RestApiService, private notification: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      msg: [null, [Validators.required]]
    });
  }

  send() {
    if (this.validateForm.valid) {
      this.api.postequest('notify', this.validateForm.value).subscribe(res => {
        this.notification.success(res['msg']);
      }, err => {
        this.notification.error('Internal server Error !!');
      });
    }
  }

}
