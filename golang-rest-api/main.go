// Package classification JobSite API.
//
// this api has three main resources jobs, contacts and applicants
//
//
// Terms Of Service:
//
// there are no TOS at this moment, feel free to use
//
//     Schemes: http
//     Host: localhost:8000
//     BasePath: /
//     Version: 0.0.1
//     Contact: Sean Carlin<seancarlin90@googlemail.com>
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
// swagger:meta
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type GlobalDefaultImageUrls struct {
	ProfilePicDefaultUrl string
	JobLogoDefaultUrl    string
}

var globalDefaultImageUrls GlobalDefaultImageUrls

////////////////////////////
//
// Contact Api
//
////////////////////////////

var contacts ContactsDto

// swagger:response contactResponse
type ContactDto struct {
	// The contact id (auto generated)
	//
	// Required: false
	ID int `json:"id,omitempty"`

	// The contact's first name
	//
	// Required: true
	FirstName string `json:"firstname,omitempty"`

	// The contact's last name
	//
	// Required: true
	LastName string `json:"lastname,omitempty"`

	// The contact's date of birth
	//
	// Required: true
	Dob string `json:"dob,omitempty"`

	// The contact's profile picture
	//
	// Required: false
	ProfilePicUrl *string `json:"profilePicUrl,omitempty"`

	// The date time the contact was first created
	CreatedTime time.Time `json:"createdtime,omitempty"`

	// The date time the contact record was last modified
	ModifiedTime time.Time `json:"modifiedtime,omitempty"`
}

// swagger:response contactsResponse
type ContactsDto struct {
	// List of contacts available
	ContactList []ContactDto `json:"contactList,omitempty"`
}

// swagger:route GET /contacts contacts GetContacts
//
// 	   get list of all contacts
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: contactResponse
func GetContacts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contacts)
}

// swagger:route GET /contacts/{id} contacts GetContact
//
// 	   get contact by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: contactResponse
func GetContact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range contacts.ContactList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

// swagger:route POST /contacts/{id} contacts CreateContact
//
// 	   create new contact
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: contactResponse
func CreateContact(w http.ResponseWriter, r *http.Request) {
	var contact ContactDto
	_ = json.NewDecoder(r.Body).Decode(&contact)

	contact.ID = len(contacts.ContactList) + 1
	contact.ProfilePicUrl = &globalDefaultImageUrls.ProfilePicDefaultUrl
	contact.CreatedTime = time.Now().UTC()
	contact.ModifiedTime = time.Now().UTC()
	contacts.ContactList = append(contacts.ContactList, contact)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&contact)
}

// swagger:route DELETE /contacts/{id} contacts DeleteContact
//
// 	   remove contact by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: contactResponse
func DeleteContact(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var deletedContact ContactDto
	for index, item := range contacts.ContactList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			deletedContact = item
			contacts.ContactList = append(contacts.ContactList[:index], contacts.ContactList[index+1:]...)
			break
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deletedContact)
}

////////////////////////////
//
// Jobs Api
//
////////////////////////////

var jobs JobsDto

// swagger:response jobResponse
type JobDto struct {
	// The job id (auto generated)
	//
	// Required: false
	ID int `json:"id,omitempty"`
	// The jobs title
	//
	// Required: true
	Title string `json:"title,omitempty"`
	// The jobs description
	//
	// Required: false
	Description string `json:"description,omitempty"`
	// The companies name
	//
	// Required: true
	CompanyName string `json:"companyName,omitempty"`
	// The companies logo
	//
	// Required: false
	LogoUrl *string `json:"logoUrl,omitempty"`
	// The contractable hours for the job
	//
	// Required: true
	Hours float64 `json:"hours,omitempty"`
	// The salary for the job
	//
	// Required: true
	Salary float64 `json:"salary,omitempty"`
	// The start date of the job
	//
	// Required: true
	StartDate time.Time `json:"startDate,omitempty"`
	// The date time the job was first created
	CreatedTime time.Time `json:"createdtime,omitempty"`
	// The date time the job record was last modified
	ModifiedTime time.Time `json:"modifiedtime,omitempty"`
}

// swagger:response jobsResponse
type JobsDto struct {
	// list of jobs available
	JobList []JobDto `json:"jobList,omitempty"`
}

// swagger:route GET /jobs jobs GetJobs
//
// 	   get list of all jobs
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: jobsResponse
func GetJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jobs)
}

// swagger:route GET /jobs/{id} jobs GetJob
//
// 	   get job by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: jobResponse
func GetJob(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range jobs.JobList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

// swagger:route POST /jobs/{id} jobs CreateJob
//
// 	   create new job
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: jobResponse
func CreateJob(w http.ResponseWriter, r *http.Request) {
	var job JobDto
	_ = json.NewDecoder(r.Body).Decode(&job)
	job.ID = len(jobs.JobList) + 1
	job.LogoUrl = &globalDefaultImageUrls.JobLogoDefaultUrl
	job.CreatedTime = time.Now().UTC()
	job.ModifiedTime = time.Now().UTC()
	jobs.JobList = append(jobs.JobList, job)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(job)
}

// swagger:route DELETE /jobs/{id} jobs DeleteJob
//
// 	   remove job by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: jobResponse
func DeleteJob(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var deletedJob JobDto
	for index, item := range jobs.JobList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			deletedJob = item
			jobs.JobList = append(jobs.JobList[:index], jobs.JobList[index+1:]...)
			break
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deletedJob)
}

// swagger:route GET contact/{id}/jobs contactsjobs GetContactJobs
//
// 	   get list of all jobs for a specific contact
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: jobsResponse
func GetContactJobs(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var jobsDto JobsDto

	jobIdsList := make(map[int]bool)

	for _, item := range applicants.ApplicantList {
		id, _ := strconv.Atoi(params["id"])
		if item.ContactID == id {
			jobIdsList[item.JobID] = true
		}
	}

	for _, item := range jobs.JobList {
		if _, ok := jobIdsList[item.ID]; ok {
			jobsDto.JobList = append(jobsDto.JobList, item)
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jobsDto)
}

////////////////////////////
//
// Applicant Api
//
////////////////////////////

var applicants ApplicantsDto

// swagger:response applicantResponse
type ApplicantDto struct {
	// The applicant id (auto generated)
	//
	// Required: false
	ID int `json:"id,omitempty"`
	// The job id associated with the application
	//
	// Required: true
	JobID int `json:"jobId,omitempty"`
	// The contact id associated with the application
	//
	// Required: false
	ContactID int `json:"contactId,omitempty"`
	// The datetime the applicant applied for the job
	//
	// Required: false
	AppliedDate time.Time `json:"appliedDate,omitempty"`
	// The date time the applicant was first created
	CreatedTime time.Time `json:"createdtime,omitempty"`
	// The date time the applicant record was last modified
	ModifiedTime time.Time `json:"modifiedtime,omitempty"`
}

// swagger:response applicantsResponse
type ApplicantsDto struct {
	// list of applicants
	ApplicantList []ApplicantDto `json:"applicantList,omitempty"`
}

// swagger:route GET /applicants applicants GetApplicants
//
// 	   get list of all applicants
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: applicantsResponse
func GetApplicants(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(applicants)
}

// swagger:route GET /applicants/{id} applicants GetApplicant
//
// 	   get applicant by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: applicantResponse
func GetApplicant(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range applicants.ApplicantList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

// swagger:route POST /applicants/{id} applicants CreateApplicant
//
// 	   create new applicant
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: applicantResponse
func CreateApplicant(w http.ResponseWriter, r *http.Request) {
	var applicant ApplicantDto
	_ = json.NewDecoder(r.Body).Decode(&applicant)
	applicant.ID = len(applicants.ApplicantList) + 1
	applicant.CreatedTime = time.Now().UTC()
	applicant.ModifiedTime = time.Now().UTC()
	applicants.ApplicantList = append(applicants.ApplicantList, applicant)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(applicant)
}

// swagger:route DELETE /applicants/{id} applicants DeleteApplicant
//
// 	   remove applicant by identifier
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Schemes: http
//
//     Responses:
//       200: applicantResponse
func DeleteApplicant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var deletedApplicant ApplicantDto
	for index, item := range applicants.ApplicantList {
		id, _ := strconv.Atoi(params["id"])
		if item.ID == id {
			deletedApplicant = item
			applicants.ApplicantList = append(applicants.ApplicantList[:index], applicants.ApplicantList[index+1:]...)
			break
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deletedApplicant)
}

func main() {
	router := mux.NewRouter()
	var port = ":8000"
	var domain = "http://localhost" + port
	var imagesUrl = "/images/"
	var contactsUrl = "/contacts"
	var contactUrl = contactsUrl + "/{id}"
	var jobsUrl = "/jobs"
	var jobUrl = "/jobs" + "/{id}"
	var applicantsUrl = "/applicants"
	var applicantUrl = "/applicants" + "/{id}"

	var profilePic1Url = domain + imagesUrl + "profile-pic1.jpeg"
	var profilePic2Url = domain + imagesUrl + "profile-pic2.jpeg"
	var profilePic3Url = domain + imagesUrl + "profile-pic3.jpeg"
	var jobLogo1Url = domain + imagesUrl + "job-logo1.jpeg"
	var jobLogo2Url = domain + imagesUrl + "job-logo2.jpeg"
	var jobLogo3Url = domain + imagesUrl + "job-logo3.jpeg"

	globalDefaultImageUrls.ProfilePicDefaultUrl = domain + imagesUrl + "profile-pic-default.jpeg"
	globalDefaultImageUrls.JobLogoDefaultUrl = domain + imagesUrl + "job-logo-default.jpeg"

	// swagger:route GET /contacts
	router.HandleFunc(contactsUrl, GetContacts).Methods("GET")
	router.HandleFunc(contactUrl, GetContact).Methods("GET")
	router.HandleFunc(contactsUrl, CreateContact).Methods("POST")
	router.HandleFunc(contactUrl, DeleteContact).Methods("DELETE")

	router.HandleFunc(contactUrl+jobsUrl, GetContactJobs).Methods("GET")

	router.HandleFunc(jobsUrl, GetJobs).Methods("GET")
	router.HandleFunc(jobUrl, GetJob).Methods("GET")
	router.HandleFunc(jobsUrl, CreateJob).Methods("POST")
	router.HandleFunc(jobUrl, DeleteJob).Methods("DELETE")

	router.HandleFunc(applicantsUrl, GetApplicants).Methods("GET")
	router.HandleFunc(applicantUrl, GetApplicant).Methods("GET")
	router.HandleFunc(applicantsUrl, CreateApplicant).Methods("POST")
	router.HandleFunc(applicantUrl, DeleteApplicant).Methods("DELETE")

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            1,
			FirstName:     "John",
			LastName:      "Smith",
			Dob:           "10/10/1987",
			ProfilePicUrl: &profilePic1Url,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            2,
			FirstName:     "Jasmine",
			LastName:      "White",
			Dob:           "10/10/1990",
			ProfilePicUrl: &profilePic3Url,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            3,
			FirstName:     "Francis",
			LastName:      "Hawk",
			Dob:           "22/10/1995",
			ProfilePicUrl: &profilePic2Url,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            4,
			FirstName:     "Steve",
			LastName:      "Jobs",
			Dob:           "1/10/1958",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            5,
			FirstName:     "Gene",
			LastName:      "Simmons",
			Dob:           "14/9/1953",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            6,
			FirstName:     "Arnold",
			LastName:      "Schwarzenegger",
			Dob:           "10/10/1965",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            7,
			FirstName:     "Sylvester",
			LastName:      "Stallone",
			Dob:           "12/3/1967",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            8,
			FirstName:     "Tom",
			LastName:      "Cruise",
			Dob:           "2/5/1980",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	contacts.ContactList = append(contacts.ContactList,
		ContactDto{
			ID:            9,
			FirstName:     "Steven",
			LastName:      "Seagal",
			Dob:           "11/4/1955",
			ProfilePicUrl: &globalDefaultImageUrls.ProfilePicDefaultUrl,
			CreatedTime:   time.Now().UTC(),
			ModifiedTime:  time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           1,
			CompanyName:  "Master Card",
			Title:        "Senior Advisor",
			Hours:        37.5,
			Salary:       42000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo1Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           2,
			CompanyName:  "Master Card",
			Title:        "Excutive",
			Hours:        52,
			Salary:       120000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo1Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           3,
			CompanyName:  "Master Card",
			Title:        "Cryptography Engineer",
			Hours:        42.5,
			Salary:       47000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo1Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           4,
			CompanyName:  "Master Card",
			Title:        "Sales Representative",
			Hours:        37.5,
			Salary:       33000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo1Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           5,
			CompanyName:  "Master Card",
			Title:        "Software Engineer",
			Hours:        37.5,
			Salary:       35000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo1Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           6,
			CompanyName:  "Pepsi Cola",
			Title:        "Junior Advisor",
			Hours:        40,
			Salary:       28000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo2Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           7,
			CompanyName:  "Pepsi Cola",
			Title:        "Taster",
			Hours:        35,
			Salary:       21000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo2Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           8,
			CompanyName:  "Pepsi Cola",
			Title:        "Manager",
			Hours:        37.5,
			Salary:       33000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo2Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           9,
			CompanyName:  "Pepsi Cola",
			Title:        "Advertiser",
			Hours:        33,
			Salary:       32000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo2Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           10,
			CompanyName:  "Pepsi Cola",
			Title:        "Senior Advertiser",
			Hours:        50,
			Salary:       61000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo2Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           11,
			CompanyName:  "Amazon",
			Title:        "Software Engineer",
			Hours:        42,
			Salary:       32000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo3Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           12,
			CompanyName:  "Amazon",
			Title:        "Alexa Voice Actor",
			Hours:        42,
			Salary:       52000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo3Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           13,
			CompanyName:  "Amazon",
			Title:        "Senior Software Engineer",
			Hours:        42,
			Salary:       42000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo3Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           14,
			CompanyName:  "Amazon",
			Title:        "Site Packer",
			Hours:        40,
			Salary:       35000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo3Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	jobs.JobList = append(jobs.JobList,
		JobDto{
			ID:           15,
			CompanyName:  "Amazon",
			Title:        "Site Maintenance Engineer",
			Hours:        55,
			Salary:       56000,
			Description:  "Starting immediately excellent package",
			LogoUrl:      &jobLogo3Url,
			StartDate:    time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           1,
			ContactID:    1,
			JobID:        1,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           2,
			ContactID:    2,
			JobID:        2,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           3,
			ContactID:    3,
			JobID:        3,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           4,
			ContactID:    4,
			JobID:        4,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           5,
			ContactID:    5,
			JobID:        5,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           6,
			ContactID:    6,
			JobID:        6,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	applicants.ApplicantList = append(applicants.ApplicantList,
		ApplicantDto{
			ID:           7,
			ContactID:    7,
			JobID:        7,
			AppliedDate:  time.Now().UTC(),
			CreatedTime:  time.Now().UTC(),
			ModifiedTime: time.Now().UTC(),
		})

	s := http.StripPrefix(imagesUrl, http.FileServer(http.Dir("."+imagesUrl)))
	router.PathPrefix(imagesUrl).Handler(s)
	sh := http.StripPrefix("/swaggerui/", http.FileServer(http.Dir("./swaggerui/")))
	router.PathPrefix("/swaggerui/").Handler(sh)
	log.Println(http.ListenAndServe(port, router))
}
