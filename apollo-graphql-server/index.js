const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Contact" type can be used in other type declarations.
  type Contact {
    id: ID
    createdtime: String
    dob: String
    firstname: String
    lastname: String
    modifiedtime: String
    profilePicUrl: String
    jobs: [Job]
  }

  type Applicant {
    id: ID
    appliedDate: String
    contactId: Int
    createdtime: String
    jobId: Int
    modifiedtime: String
    job: Job
    contact: Contact
  }

  type Job {
    id: ID
    companyName: String
    createdtime: String
    description: String
    hours: Float
    logoUrl: String
    modifiedtime: String
    salary: Int
    startDate: String
    title: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    getContact(id: Int!): Contact!
    getContacts: [Contact]
    getContactById(id: Int!): [Contact]
    getJob(id: Int!): Job!
    getJobs: [Job]
    getApplicant(id: Int!): Applicant!
    getApplicants: [Applicant]
  }

  type ContactResponse {
    status: Boolean
    message: String
    contact: Contact!
  }

  type Mutation {
    deleteContact(id: Int!): ContactResponse!
    addContact(firstname: String, lastname: String, dob: String): ContactResponse!
  }
`;

// Resolvers define the technique for fetching the types in the
// schema. 
const resolvers = {
  Applicant: {
    async job(applicant, _, { dataSources }) {
      return dataSources.jobsApi.getJob(applicant.jobId);
    },
    async contact(applicant, _, { dataSources }) {
      return dataSources.contactsApi.getContact(applicant.contactId);
    }
  },
  Contact: {
    async jobs(contact, _, { dataSources }) {
      return dataSources.contactsApi.getContactsJobs(contact.id);
    }
  },
  Query: {
    getContact: async (_source, { id }, { dataSources }) => {
      return dataSources.contactsApi.getContact(id);
    },
    getContactById: async (_source, { id }, { dataSources }) => {
      return dataSources.contactsApi.getContactsById(id);
    },
    getContacts: async (_source, _args, { dataSources }) => {
      return dataSources.contactsApi.getContacts();
    },
    getJob: async (_source, { id }, { dataSources }) => {
      return dataSources.jobsApi.getJob(id);
    },
    getJobs: async (_source, _args, { dataSources }) => {
      return dataSources.jobsApi.getJobs();
    },
    getApplicant: async (_source, { id }, { dataSources }) => {
      return dataSources.applicantsApi.getApplicant(id);
    },
    getApplicants: async (_source, _args, { dataSources }) => {
      return dataSources.applicantsApi.getApplicants();
    }
  },
  Mutation: {
    deleteContact: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.contactsApi.deleteContact(id);
      return {
        status: result.id !== undefined ? true : false,
        message:
          result.id !== undefined
            ? `Contact with id: ${id} deleted successfully`
            : `Contact with id: ${id} could not be deleted`,
        contact: result
      };
    },
    addContact: async (_source, {id, firstname, lastname, dob }, { dataSources }) => {
      const result = await dataSources.contactsApi.addContact({firstname: firstname, lastname: lastname, dob: dob});
      return {
        status: result.id !== undefined ? true : false,
        message:
          result.id !== undefined
            ? `Contact with id: ${id} added successfully`
            : `Contact with id: ${id} could not be added`,
        contact: result
      };
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      contactsApi: new ContactsApi(),
      jobsApi: new JobsApi(),
      applicantsApi: new ApplicantsApi()
    };
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

class ContactsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://golang.api:8000/";
  }

  async getContact(contactId) {
    return await this.get(`contacts/${contactId}`);
  }

  async getContacts(limit = 10) {
    const data = await this.get("contacts");
    return data.contactList;
  }

  async getContactsJobs(contactId) {
    const data = await this.get(`contacts/${contactId}/jobs`);
    return data.jobList;
  }

  async deleteContact(contactId) {
    const data = await this.delete(`contacts/${contactId}`);
    return data;
  }

  async addContact(contact) {
    contact.createdtime = null;
    contact.modifiedtime = null;
    let data = await this.post(`contacts`, contact);
    console.log("data", data);
    return data;
  }
}

class JobsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://golang.api:8000/";
  }

  async getJob(jobId) {
    return await this.get(`jobs/${jobId}`);
  }

  async getJobs(limit = 10) {
    const data = await this.get("jobs");
    return data.jobList;
  }
}

class ApplicantsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://golang.api:8000/";
  }

  async getApplicant(applicantId) {
    return await this.get(`applicants/${applicantId}`);
  }

  async getApplicants(limit = 10) {
    const data = await this.get("applicants");
    return data.applicantList;
  }
}
