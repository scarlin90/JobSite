import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardModel: CardModel;

  @Output() cardClick: EventEmitter<CardModel> = new EventEmitter<CardModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.cardClick.emit(this.cardModel);
  }

}
