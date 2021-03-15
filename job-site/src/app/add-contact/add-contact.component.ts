import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ContactsService, ContactListDto, ContactDto } from '../api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {
  @Output() addContact: EventEmitter<Partial<ContactDto>> = new EventEmitter<Partial<ContactDto>>();

  public createContactSubscription: Subscription;
  public contactToAdd: ContactDto = {
    firstname: '',
    lastname: '',
    dob: '1/1/2000'
  }

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.createContactSubscription?.unsubscribe();
  }

  onAddClick() {
    this.createContactSubscription = this.contactsService.createContact(this.contactToAdd as any).subscribe(res => {
      this.addContact.emit(this.contactToAdd);
    })
  }
}
