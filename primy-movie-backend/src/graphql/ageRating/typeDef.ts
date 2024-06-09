const ageRatingTypeDef = `#graphql
type ageRating{
    _id: String!
    rating: String!
    defination: String!
}

type Query {
    ageRatings:[ageRating]
  }

`;

export default ageRatingTypeDef;
