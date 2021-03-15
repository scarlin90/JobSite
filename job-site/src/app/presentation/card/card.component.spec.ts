import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const cardModel = {
    identifier: '1',
    imgUrl: 'imgUrl',
    bodyText: 'my body text',
    footerText: 'my footer text',
    isSelected: true,
    titleText: 'my title text'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    component.cardModel = cardModel;

    fixture.detectChanges();
  });

  it('CC001 - should create card component', () => {
    // arrange
    // act

    // assert
    expect(component).toBeTruthy();
  });

  it('CC002 - should create emit click event with card data', () => {
    // arrange
    const spy = spyOn(component.cardClick, 'emit');
    // act
    component.onCardClick();
    // assert
    expect(spy).toHaveBeenCalledWith(cardModel);
  });
});
