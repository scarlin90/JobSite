import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddContactComponent } from './add-contact.component';
import { of } from 'rxjs';
import { ContactDto, ApiModule } from '../api';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      imports: [ApiModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ACC001 - should call create contact endpoint onAddClick', fakeAsync(() => {
    // arrange
    const contactDto: ContactDto = {
      id: 1,
      profilePicUrl: 'profilePicUrl',
      firstname: 'Joe',
      lastname: 'Black',
      dob: '1/1/2000'
    };
    component.contactToAdd = contactDto;
    const spyCreateContact = spyOn(component[`contactsService`], 'createContact').and.returnValue(of(contactDto) as any)
    const spyAddContact = spyOn(component.addContact, 'emit');

    // act
    component.onAddClick();
    tick();

    // assert
    expect(component).toBeTruthy();
    expect(spyCreateContact).toHaveBeenCalledWith(contactDto);
    expect(spyAddContact).toHaveBeenCalledWith(contactDto);
  }));

  it('ACC002 - should destroy subscriptions OnDestroy', () => {
    // arrange
    component.createContactSubscription = of().subscribe();
    const spyUnsubscribe = spyOn(component.createContactSubscription, 'unsubscribe');

    // act
    component.ngOnDestroy();

    // assert
    expect(component).toBeTruthy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('ACC003 - should not call unsubscribe if subscription is undefined OnDestroy', () => {
    // arrange
    component.createContactSubscription = undefined;

    // act
    component.ngOnDestroy();

    // assert
    expect(component).toBeTruthy();
    expect(component.createContactSubscription).toBeUndefined();
  });
});
