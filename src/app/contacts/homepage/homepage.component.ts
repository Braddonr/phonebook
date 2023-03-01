import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactModel } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  contactList: any= [];
  sortedList: any= [];
  radioValue = 'list';
  isVisible = false;
  formAdd!: FormGroup;
  contactModelObj : ContactModel = new ContactModel();
  searchTerm: string = '';
  list : boolean = true;
  isCheckedButton = true;
  isDisabledButton = false;
  showCheckboxes = false;
  showDelete = false; 
  deleteIds: any[] =[];
  loading = false;

  constructor(
    private http: HttpClient, 
    private modal: NzModalService,
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
  this.loading= true;
  this.contacts.getAllContacts()
 .subscribe(res => {
  this.loading= false;
  this.contactList = res;

  //sort alphabetically
  this.contactList.sort((a:any, b:any) => {
    let fa = a.firstName.toLowerCase(),
        fb = b.firstName.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
console.log(this.contactList);



  // this.data.map((x: any) => {
  //   this.contactList.push({id: x.id, firstName: x.firstName})

  // })

  // console.log(this.data);

  // this.contacts.sortData(this.contactList, "firstName")

   });
  }

 checkboxValue(contact: any){
  this.showDelete = this.showCheckboxes;  
  
  this.deleteIds.push(contact.id)
  console.log(this.deleteIds);
  
}

  activateMultipleSelect(){
    this.showCheckboxes = !this.showCheckboxes;
   if(this.showCheckboxes == false && this.showDelete== true){
   this.showDelete = false;
   }
  }
  checkButton(): void {
    this.isCheckedButton = !this.isCheckedButton;
  }

  disableButton(): void {
    this.isDisabledButton = !this.isDisabledButton;
  }

  view(item: any): void {
    this.router.navigate(['/contacts/view-contact', item.id]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.createNewContact()
    this.getContacts()
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  createNewContact(){
  this.contactModelObj.firstName = this.formAdd.value.firstName
  this.contactModelObj.lastName = this.formAdd.value.lastName
  this.contactModelObj.phoneNumber = this.formAdd.value.phoneNumber
  this.contactModelObj.email = this.formAdd.value.email
  this.contactModelObj.physicalAddress = this.formAdd.value.physicalAddress

  this.loading= true;
  this.contacts.postContact(this.contactModelObj)
  .subscribe(res =>{
  console.log(res);
  alert('New Contact has been added successfully')
  this.loading= false;
  this.formAdd.reset();
  this.getContacts();
  }, 
  err =>{
  alert('Something went wrong')
  })
  }


  deleteContact(contact: any){
  this.loading = true;
  this.contacts.deleteContact(contact.id)
  .subscribe(res =>{
    alert('Contact deleted Successfully')
    this.loading = false;
    this.getContacts()
  },
  err =>{
    alert('Something went wrong')
  })
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Delete contact',
      nzContent: '<p style="color: red;">Are you sure you want to delete these contacts?</p>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteMultipleContacts(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteMultipleContacts(){
  //  this.contacts.deleteSeveralContacts(this.deleteIds)
  //  this.getContacts()
  //  !this.showCheckboxes 

  this.deleteIds.forEach(id => {
    
    fetch(`http://localhost:3000/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.loading = false;
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);    
      }
        alert("Contacts have been successfully deleted")
        this.showCheckboxes = false;
        this.showDelete = false;
        this.router.navigate(['/contacts/home'])
        this.getContacts();
    })
    .catch(error => {
      console.log('testing');
      console.error('Error:', error);
    });
  });
  }

  changeView(){
   if(this.radioValue == 'list'){
      this.list= true;
   }
   else {
    this.list = false;
   }
  
  }

}
