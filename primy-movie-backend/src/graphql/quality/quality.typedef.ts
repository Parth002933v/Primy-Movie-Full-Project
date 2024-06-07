export const qualityTypedef = `#graphql
type quality{
    _id:String
    Quality: String
    Nickname: String
}

type Query{
    videoQualitys:[quality]
}
`;
