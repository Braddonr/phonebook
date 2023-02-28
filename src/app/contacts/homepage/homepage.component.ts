import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  contactList = [];
  radioValue = 'list';
  isVisible = false;
  formAdd!: FormGroup;
  

  constructor(
    private http: HttpClient, 
    private contacts: ContactService,
    private msg: NzMessageService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formAdd = this.formBuilder.group({
      firstName:new FormControl('', [<any>Validators.required]),
      lastName:new FormControl('', [<any>Validators.required]),
      email:new FormControl('', [<any>Validators.required]),
      phoneNumber:new FormControl('', [<any>Validators.required]),
      physicalAddress: new FormControl('', [<any>Validators.required]),
    });
  this.getContacts();
  }

  getContacts() {
  this.contacts.getData()
 .subscribe(res => {
  this.contactList = res;
  console.log(this.contactList);
  
  // this.data.map((x: any) => {
  //   this.contactList.push({id: x.id, firstName: x.firstName})

  // })

  // console.log(this.data);
   });
  }

  view(item: any): void {
    this.router.navigate(['/contacts/view-contact', item.id]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
