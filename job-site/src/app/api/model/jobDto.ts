/**
 * JobSite API.
 * this api has three main resources jobs, contacts and applicants
 *
 * OpenAPI spec version: 0.0.1
 * Contact: seancarlin90@googlemail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface JobDto {
  /**
   * The companies name
   */
  companyName: string;
  /**
   * The date time the job was first created
   */
  createdtime?: Date;
  /**
   * The jobs description
   */
  description?: string;
  /**
   * The contractable hours for the job
   */
  hours: number;
  /**
   * The job id (auto generated)
   */
  id?: number;
  /**
   * The companies logo
   */
  logoUrl?: string;
  /**
   * The date time the job record was last modified
   */
  modifiedtime?: Date;
  /**
   * The salary for the job
   */
  salary: number;
  /**
   * The start date of the job
   */
  startDate: Date;
  /**
   * The jobs title
   */
  title: string;
}

export interface JobListDto {
  jobList: JobDto[];
}
