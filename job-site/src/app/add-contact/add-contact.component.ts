import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactsService, ContactListDto, ContactDto } from '../api';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @Output() addContact: EventEmitter<Partial<ContactDto>> = new EventEmitter<Partial<ContactDto>>();

  public contactToAdd: ContactDto = {
    firstname: '',
    lastname: '',
    dob: '1/1/2000'
  }

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  onAddClick() {
    this.contactsService.createContact(this.contactToAdd as any).subscribe(res => {
      this.addContact.emit(this.contactToAdd);
    })
  }
}
