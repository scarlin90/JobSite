import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DatePipe } from '@angular/common'

import { ContactListComponent } from './contact-list.component'
import { ApiModule, ContactDto, ContactListDto } from '../api'
import { ModalModule } from 'ngx-bootstrap/modal'
import { of } from 'rxjs'
import { TemplateRef } from '@angular/core'

describe('ContactListComponent', () => {
  let component: ContactListComponent
  let fixture: ComponentFixture<ContactListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      providers: [DatePipe],
      imports: [ApiModule, HttpClientTestingModule, ModalModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('CLC001 - should call getContacts onInit', () => {
    // arrange
    const spyGetContacts = spyOn(component, 'getContacts')
    // act
    component.ngOnInit()
    // assert
    expect(spyGetContacts).toHaveBeenCalled()
  })

  it('CLC002 - should return data and map to cards array with second selected when getContacts is invoked', fakeAsync(() => {
    // arrange
    const contact1: ContactDto = {
      id: 1,
      profilePicUrl: 'profilePic 1',
      firstname: 'contact 1',
      lastname: 'lastname 1',
      dob: '1/1/2000',
      createdtime: new Date(2021, 2, 1),
      modifiedtime: new Date(2021, 2, 1),
    }

    const contact2: ContactDto = {
      id: 2,
      profilePicUrl: 'profilePic 2',
      firstname: 'contact 2',
      lastname: 'lastname 2',
      dob: '1/1/2001',
      createdtime: new Date(2021, 2, 2),
      modifiedtime: new Date(2021, 2, 2),
    }

    const contactResponse: ContactListDto = {
      contactList: [contact1, contact2],
    }

    component.selectedContacts = [
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    const spyGetContacts = spyOn(
      component[`contactsService`],
      'getContacts',
    ).and.returnValue(of(contactResponse) as any)

    // act
    component.getContacts()
    tick()

    // assert
    expect(spyGetContacts).toHaveBeenCalled()
    expect(component.cardList).toEqual([
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ])
  }))

  it('CLC003 - should update selectedContacts array with contacts that are selected', () => {
    // arrange
    component.cardList = [
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    // act
    component.updateSelectedContacts()

    // assert
    expect(component.selectedContacts).toEqual([
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ])
  })

  it('CLC004 - should hide modal and refresh contact list onContactAdded', () => {
    // arrange
    component.modalRef = { hide() {} } as any
    const spyHide = spyOn(component[`modalRef`], 'hide')
    const spyGetContacts = spyOn(component, 'getContacts')
    const contact: ContactDto = {
      id: 1,
      profilePicUrl: 'profilePic 1',
      firstname: 'contact 1',
      lastname: 'lastname 1',
      dob: '1/1/2000',
      createdtime: new Date(2021, 2, 1),
      modifiedtime: new Date(2021, 2, 1),
    }

    // act
    component.onContactAdded(contact)

    // assert
    expect(spyHide).toHaveBeenCalled()
    expect(spyGetContacts).toHaveBeenCalled()
  })

  it('CLC005 - should show modal onAddButtonClick', () => {
    // arrange
    const spyShow = spyOn(component[`modalService`], 'show')

    const template = { name: 'test template' } as any

    // act
    component.onAddButtonClick(template as any)

    // assert
    expect(spyShow).toHaveBeenCalledWith(template)
  })

  it('CLC006 - should toggle card as selected and update selectedContacts', () => {
    // arrange
    component.cardList = [
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    // act
    component.onCardClick({
      identifier: '1',
      imgUrl: 'profilePic 1',
      titleText: 'contact 1 lastname 1',
      bodyText: '1/1/2000',
      footerText: 'Mar 1, 2021, 12:00:00 AM',
      isSelected: false,
    })

    // assert
    expect(component.selectedContacts).toEqual([
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: true,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ])
  })

  it('CLC007 - should not toggle card as selected when not found', () => {
    // arrange
    component.cardList = [
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    // act
    component.onCardClick({
      identifier: '3',
      imgUrl: 'profilePic 3',
      titleText: 'contact 3 lastname 3',
      bodyText: '1/1/2000',
      footerText: 'Mar 1, 2021, 12:00:00 AM',
      isSelected: false,
    })

    // assert
    expect(component.selectedContacts).toEqual([
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ])
  })

  it('CLC008 - should find contacts selected and call api to delete onDeleteClick', fakeAsync(() => {
    // arrange
    component.cardList = [
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    const spyDeleteContact = spyOn(
      component[`contactsService`],
      'deleteContact',
    ).and.returnValue(of())

    // act
    component.onDeleteClick()
    tick()

    // assert
    expect(spyDeleteContact).toHaveBeenCalledWith(2)
  }))

  it('CLC009 - should find remove selected contacts and update contactList', () => {
    // arrange
    component.cardList = [
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
      {
        identifier: '2',
        imgUrl: 'profilePic 2',
        titleText: 'contact 2 lastname 2',
        bodyText: '1/1/2001',
        footerText: 'Mar 2, 2021, 12:00:00 AM',
        isSelected: true,
      },
    ]

    const spyUpdateSelectedContacts = spyOn(component, 'updateSelectedContacts')

    // act
    component.removeSelectedContacts()

    // assert
    expect(component.cardList).toEqual([
      {
        identifier: '1',
        imgUrl: 'profilePic 1',
        titleText: 'contact 1 lastname 1',
        bodyText: '1/1/2000',
        footerText: 'Mar 1, 2021, 12:00:00 AM',
        isSelected: false,
      },
    ])
    expect(spyUpdateSelectedContacts).toHaveBeenCalled()
  })
})
