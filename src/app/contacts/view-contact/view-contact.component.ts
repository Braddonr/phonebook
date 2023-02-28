import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  isVisibleEdit= false;
  contact: any;
  formEdit!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modal: NzModalService
    
    ) { }

  ngOnInit(): void {
  }

  getContact(){

  }
  onBack(){
    this.router.navigate(['/contacts/home'])
  }
  showModalEdit(user: any): void{
      // this.getContact();
      // this.contact = user;
      // this.formEdit = this.fb.group(this.contact);
      this.isVisibleEdit = true;
      // console.log(this.contact)
  }


  handleOkEdit(): void {
    this.editContact();
    console.log('Button ok clicked!');
    this.isVisibleEdit = false;
  }

  handleCancelEdit(): void {
    console.log('Button cancel clicked!');
    this.isVisibleEdit = false;
  }

  editContact(){

  }

  deleteContact(contact: any){
   console.log('Contact deleted')
   this.router.navigate(['/contacts/home'])
  }
  showDeleteConfirm(contact: any): void {
    this.modal.confirm({
      nzTitle: 'Delete contact',
      nzContent: '<p style="color: red;">Are you sure you want to delete this contact?</p>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteContact(contact),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
