# Job Site
This project is to develop a fully functional job site with a modern tech stack for learning and sharing purposes.

## Proposed Software Stack
| Tech/Lib | Purpose |
| ------ | ------ |
| [GoLang](https://golang.org/) + [Gorilla/Mux](https://github.com/gorilla/mux) | To serve a fast restiful api with low memory consumption |
| [NodeJs](https://nodejs.org/en/) [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | To wrap the restiful api in a GraphQL implementation |
| [Angular 7](https://angular.io/) + [Apollo Client](https://www.apollographql.com/docs/angular/) | To build a modern UI and query the GraphQL server |
|[Docker](https://www.docker.com/)| To package all parts of the app in separate containers |


### Running Application (Docker)
##### Step 1 
Install [Docker](https://www.docker.com/)
##### Step 2
Open a terminal and run the following commands 
```sh
$ cd JobSite
$ docker-compose up
```
##### Step 3
To access Apollo Playground and write QraphQL queries
Open browser with following URL: http://localhost:4000

- Note: Rest API is available at http://localhost:8000 and swagger is available at http://localhost:8000/swaggerui/#/

### Docker Images
Each of the component images can be retrieved with the following commands:

| Component | Latest Image Command |
| ------ | ------ |
| GoLang Rest Api | docker pull scarlin90/go-restapi:latest |
| Apollo GraphQL Server | docker pull scarlin90/node-graphql-server:latest |

### Contributors
##### [Sean Carlin](https://github.com/scarlin90)