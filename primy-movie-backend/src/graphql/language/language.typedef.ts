const languageTypeDef = `#graphql
type language{
    _id: String
    languageName: String
}

type Query {
    languages:[language]
  }

`;

export default languageTypeDef;
