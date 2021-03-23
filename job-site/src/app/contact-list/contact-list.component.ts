import { Component, OnInit, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContactsService, ContactDto } from 'src/app/api';
import { CardModel } from '../presentation/card/card.model';
import { ListHeaderModel } from '../presentation/list-header/list-header.model';

import { forkJoin, Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CardListService } from '../common-services/card-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  headerModel: ListHeaderModel = {
    headerText: 'Contacts',
  };
  cardList: CardModel[] = [];
  selectedCount: number = 0;
  selectedContacts: CardModel[] = [];

  modalRef: BsModalRef;

  constructor(
    private contactsService: ContactsService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private cardListService: CardListService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  onCardClick(cardModel: CardModel) {
    this.selectedContacts = this.cardListService.updateSelected(
      this.cardList,
      cardModel
    );
  }

  onDeleteClick() {
    let contactsToDelete: Observable<any>[] = [];
    const selectedContacts = this.cardList.filter((card) => card.isSelected);
    selectedContacts.forEach((contact) => {
      contactsToDelete.push(
        this.contactsService.deleteContact(+contact.identifier)
      );
    });

    forkJoin(contactsToDelete).subscribe((s) => {
      this.removeSelectedContacts();
    });
  }

  onAddButtonClick(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onContactAdded(contactAdded: ContactDto) {
    this.modalRef.hide();
    this.getContacts();
  }

  getContacts() {
    this.contactsService.getContacts().subscribe((contactResponse) => {
      this.cardList = contactResponse.contactList.map((contact) => {
        return {
          identifier: contact.id.toString(),
          imgUrl: contact.profilePicUrl,
          titleText: `${contact.firstname} ${contact.lastname}`,
          bodyText: `DOB: ${contact.dob}`,
          footerText: this.datePipe.transform(contact.createdtime, 'medium'),
          isSelected: this.selectedContacts.find(
            (sc) => sc.identifier === contact.id.toString()
          )
            ? true
            : false,
        };
      });
    });
  }

  removeSelectedContacts() {
    this.cardList = this.cardList.filter((card) => !card.isSelected);
    this.selectedContacts = this.cardListService.getSelected(this.cardList);
  }
}
