import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobDto, JobsService } from '../api';
import { CardListService } from '../common-services/card-list.service';
import { CardModel } from '../presentation/card/card.model';
import { ListHeaderModel } from '../presentation/list-header/list-header.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  public headerModel: ListHeaderModel = {
    headerText: 'Jobs',
  };
  public cardList: CardModel[] = [];
  public selectedJobs: CardModel[] = [];

  constructor(
    private jobsService: JobsService,
    private datePipe: DatePipe,
    private cardListService: CardListService
  ) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.jobsService.getJobs().subscribe((response) => {
      const jobList = response.jobList as JobDto[];
      this.cardList = jobList.map((job) => {
        return {
          identifier: job.id.toString(),
          imgUrl: job.logoUrl,
          titleText: `${job.title} - ${job.companyName}`,
          bodyText: job.description,
          footerText: this.datePipe.transform(job.startDate, 'medium'),
          isSelected: false,
        };
      });
    });
  }

  onCardClick(cardModel: CardModel) {
    this.selectedJobs = this.cardListService.updateSelected(
      this.cardList,
      cardModel
    );
  }
}
