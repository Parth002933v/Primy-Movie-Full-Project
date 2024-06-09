export const providerTypedef = `#graphql




type provider{
    _id:String
    providerName:String
    image:String
} 

type Query{

    providers:[provider]


}


`;
