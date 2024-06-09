const genereTypeDef = `#graphql
type genere{
    _id: String
    name:String
}

type Query {
    generes:[genere]
  }

`;

export default genereTypeDef;
