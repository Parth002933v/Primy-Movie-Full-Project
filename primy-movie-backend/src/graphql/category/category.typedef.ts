const categoryTypeDef = `#graphql
type category{
    _id: String
    name:String
}

type Query {
  categoris:[category]
  }

`;

export default categoryTypeDef;
