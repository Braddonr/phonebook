import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, catchError, of } from 'rxjs';
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
  isChecked = false; 
  deleteIds: any[] =[];
  loading = false;

  public files: any[] = [];
  file: any;
  
  constructor(
    private http: HttpClient, 
    private modal: NzModalService,
    private contacts: ContactService,
    private msg: NzMessageService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private f : FormData
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


onFileChanged(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadFile(file);
  }
}

uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  console.log(formData.get('file'));

  this.formAdd.patchValue({
    imageUrl: formData
  });
  console.log(this.formAdd.value);
  
  

  // this.http.post<any>('your-backend-url', formData).subscribe(
  //   (res) => {
  //     console.log(res.path);
  //   },
  //   (err) => console.log(err)
  // );
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
  this.isChecked = !this.isChecked;
  this.showDelete = this.showCheckboxes;
  
  if(!this.deleteIds.includes(contact.id)){
  this.deleteIds.push(contact.id)
  console.log(this.deleteIds);
}
  
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

  const baseUrl = 'http://localhost:3000/contacts/'; // base URL of JSON server
  
  Promise.all(this.deleteIds.map(id => {
    const url = `${baseUrl}${id}`;
    return fetch(url, {
       method: 'DELETE',
       headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(response => {
        this.loading= true;
        if (!response.ok) {
          throw new Error(`Failed to delete ID ${id}`);
        }
        this.getContacts();
        return response.json();
      })
      .then(data => {alert(`Successfully deleted ID ${id}`)})
      .catch(error => alert(`Error deleting ID ${id}:`));
  }))
    .then(() => alert('Selected contacts deleted successfully'))
    .catch(error => alert('At least one request failed:'));
    this.loading = false;
    this.showCheckboxes = false;
    this.showDelete = false;  
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
