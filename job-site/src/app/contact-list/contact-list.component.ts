import { Component, OnInit, Input } from '@angular/core';
import { ContactDto, ContactsService } from 'src/app/api';
import { CardModel } from '../presentation/card/card.model';
import { DatePipe } from '@angular/common';
import { ListHeaderModel } from '../presentation/list-header/list-header.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  headerModel: ListHeaderModel = {
    headerText: 'Contacts'
  }
  cardList: CardModel[] = [];

  constructor(private contactsService: ContactsService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(contactResponse => {
      this.cardList = contactResponse.contactList.map(contact => {
        return {
          identifier: contact.id.toString(),
          imgUrl: contact.profilePicUrl,
          titleText: `${contact.firstname} ${contact.lastname}`,
          bodyText: contact.dob,
          footerText: this.datePipe.transform(contact.createdtime, 'medium'),
          isSelected: false
        }
      });
    })
  }

  onCardClick(cardModel: CardModel) {
    const cardMatch = this.cardList.find(card => card.identifier === cardModel.identifier);
    if (cardMatch) {
      cardMatch.isSelected = !cardMatch.isSelected;
    }

    const selectedCount = this.cardList.filter(card => card.isSelected).length;
    this.headerModel.subHeaderText = `${selectedCount} Selected`

  }
}
