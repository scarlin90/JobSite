import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderComponent } from './list-header.component';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    component.listHeaderModel = {
      headerText: 'my header text'
    }
    fixture.detectChanges();
  });

  it('LHC001 - should create component', () => {
    // arrange
    // act

    // assert
    expect(component).toBeTruthy();
  });
});
