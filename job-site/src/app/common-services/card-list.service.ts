import { Injectable } from '@angular/core';
import { CardModel } from '../presentation/card/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor() {}

  updateSelected(cardList: CardModel[], cardModel: CardModel) {
    const cardMatch = cardList.find(
      (card) => card.identifier === cardModel.identifier
    );
    if (cardMatch) {
      cardMatch.isSelected = !cardMatch.isSelected;
    }

    return this.getSelected(cardList);
  }

  getSelected(cardList: CardModel[]) {
    return cardList.filter((card) => card.isSelected);
  }
}
