import { Component, OnInit, Input } from '@angular/core';
import { ListHeaderModel } from './list-header.model';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() listHeaderModel: ListHeaderModel;

  constructor() { }

  ngOnInit(): void {
  }

}
