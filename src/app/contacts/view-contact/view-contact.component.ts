import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactModel } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  isVisibleEdit= false;
  contact: any;
  viewedContact: any;
  formEdit!: FormGroup;
  id!: number;
  contactModelObj : ContactModel = new ContactModel();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modal: NzModalService,
    private contacts : ContactService,
    private activatedRoute: ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      firstName:new FormControl('', [<any>Validators.required]),
      lastName:new FormControl('', [<any>Validators.required]),
      email:new FormControl('', [<any>Validators.required]),
      phoneNumber:new FormControl('', [<any>Validators.required]),
      physicalAddress: new FormControl('', [<any>Validators.required]),
    });
    this.activatedRoute.params.subscribe(val=>{
      this.id = val['id'];
      console.log(this.id)
    })
    this.getOneContact(this.id)
  }

  getOneContact(id: number){
   this.contacts.getContactById(id)
   .subscribe(res =>{
   this.viewedContact = res;
   console.log(this.viewedContact);
   
   })
  }
  onBack(){
    this.router.navigate(['/contacts/home'])
  }
  showModalEdit(): void{  
   this.formEdit.controls['firstName'].setValue(this.viewedContact.firstName)
   this.formEdit.controls['lastName'].setValue(this.viewedContact.lastName)
   this.formEdit.controls['phoneNumber'].setValue(this.viewedContact.phoneNumber)
   this.formEdit.controls['email'].setValue(this.viewedContact.email)
   this.formEdit.controls['physicalAddress'].setValue(this.viewedContact.physicalAddress)
   this.isVisibleEdit = true;
  // console.log(this.contact)
  }


  handleOkEdit(): void {
    this.editContact();
    this.getOneContact(this.id);
    console.log('Button ok clicked!');
    this.isVisibleEdit = false;
  }

  handleCancelEdit(): void {
    console.log('Button cancel clicked!');
    this.isVisibleEdit = false;
  }

  editContact(){
  this.contactModelObj.id= this.viewedContact.id
  this.contactModelObj.firstName = this.formEdit.value.firstName
  this.contactModelObj.lastName = this.formEdit.value.lastName
  this.contactModelObj.phoneNumber = this.formEdit.value.phoneNumber
  this.contactModelObj.email = this.formEdit.value.email
  this.contactModelObj.physicalAddress = this.formEdit.value.physicalAddress
  
  this.contacts.editContact(this.contactModelObj, this.contactModelObj.id)
  .subscribe( res=>{
    alert("Contact updated successfully");
    this.formEdit.reset();
    this.getOneContact(this.id);
  }, 
  err =>{
    alert('Something went wrong')
  })
  }


  deleteContact(id: any){
    this.contacts.deleteContact(this.id)
    .subscribe(res =>{
      alert('Contact deleted Successfully')
      this.router.navigate(['/contacts/home'])
    },
    err =>{
      alert('Something went wrong')
    })
  }
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Delete contact',
      nzContent: '<p style="color: red;">Are you sure you want to delete this contact?</p>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteContact(this.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
