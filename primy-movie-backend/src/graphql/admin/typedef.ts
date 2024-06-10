export const adminTypeDef = `#graphql

input adminSignInInput{
    password: String!
}

type Query {
    hy: String
  }

input adminSignUpInput{
    email: String!
    password: String!
}


type User {
    _id: ID!
    email: String!
  }
  
type Mutation  {
    adminSignIn(input: adminSignInInput!) : String
    adminSignUp(input: adminSignUpInput!) : User
}



`;
