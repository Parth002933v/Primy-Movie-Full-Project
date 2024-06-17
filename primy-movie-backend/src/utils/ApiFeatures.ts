


export class ApiGraphqlFeatures {
  query : any
  constructor({query}:{query:any}) {
    this.query = query
  }

  sort({sortBy}:{sortBy?:string}) {
    if (sortBy) {
      const sort = sortBy.split(",").join(" ");
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort("-createdAt"); // Default sorting
    }
    return this;

  }

  
  limitFields({fields}:{fields?:string}) {

    // req.query.fields =
    // "name,content,slugUrl,posterImage,bannerImage,screenShorts,downloadLink,releaseYear,genre,languages,isDualAudio,Seasons,isSeries,category,ageRating,movieProvider";
    if (fields) {
      const finalFields = fields.split(",").join(" ");

      this.query = this.query.select(finalFields);
    } else {
      this.query = this.query.select("-__v"); // Exclude '__v' field by default
    }
    return this;
  }


  paginate({ pageNumber }: { pageNumber?: number }) {
    const page = pageNumber || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  populate(value: string) {
    this.query.populate({ path: value, select: "-__v" });
    return this;
  }
}