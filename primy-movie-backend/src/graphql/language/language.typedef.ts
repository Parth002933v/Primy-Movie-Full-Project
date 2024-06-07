const languageTypeDef = `#graphql
type language{
    _id: String
    name:String
}

type Query {
    languages:[language]
  }

`;

export default languageTypeDef;
