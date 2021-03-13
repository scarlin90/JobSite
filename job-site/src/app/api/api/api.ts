export * from './applicants.service';
import { ApplicantsService } from './applicants.service';
export * from './contacts.service';
import { ContactsService } from './contacts.service';
export * from './jobs.service';
import { JobsService } from './jobs.service';
export const APIS = [ApplicantsService, ContactsService, JobsService];
