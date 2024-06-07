export const adminTypeDef = `#graphql
type Query {
    hy: String
  }
  
type Mutation  {
    adminSignUp(input: adminSignUpInput!) : User
    adminSignIn(input: adminSignInInput!) : String
}


input adminSignUpInput{
    email: String!
    password: String!
}

input adminSignInInput{
    password: String!
}

type User {
    _id: ID!
    email: String!
  }


`;
