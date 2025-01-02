import { groq } from "next-sanity";

export const COUNT_ARTICLES = groq`count(*[_type == 'article' && isFullyPaid == false])`;
export const COUNT_ALL_ARTICLES = groq`count(*[_type == 'article'])`;
export const SOCIAL_FEED = groq`*[_type == 'socialFeed']{
    name,
    href,
    "img": image.asset->url,
    overview
}`;
export const REALITIES_QUERY = groq`*[_type == 'reality' && status == 'Na prodej'][0...5] | order(_createdAt desc) {
    name,
    'slug': slug.current,
    overview,
    price,
    "imageUrl": image.asset->url
  }`;

  

  export const REALITY_QUERY = groq`*[_type == 'reality' && slug.current == $slug][0]{
    name,   
   "slug": slug.current,
   street,
   street_number,
   city,
   postcode,
   details,
   "imageUrl": image.asset->url,
   "galleryUrls": gallery[].asset->url,
   "planUrl": floor_plan.asset->url,
   "houseUrl": house_plan.asset->url,
   price,
   area,
   }`;

export const ARTICLES_QUERY = groq`*[_type == 'article' && isFullyPaid == false] | order(priority desc, datum desc)[$start..$end]{
    name,
    "slug": slug.current,
    "picture": image.asset->url,
    datum,
    overview,
}`;

export const HOME_ARTICLES_QUERY = groq`*[_type == 'article' && isFullyPaid == false] | order(priority desc,datum desc)[0..2] {
    name,
    "slug": slug.current,
    "picture": image.asset->url,
    datum,
    overview,
}`;

export const ALL_ARTICLES_QUERY = groq`*[_type == 'article'] | order(priority desc,datum desc)[$start..$end]{
    name,
    "slug": slug.current,
    "picture": image.asset->url,
    datum,
    overview,
}`;

export const ARTICLE_QUERY = groq`*[_type == 'article' && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    "picture": image.asset->url,
    datum,
    overview,
    unpaid_text,
    paid_text,
}`;

export const REVIEWS_QUERY = groq`*[_type == 'review'] | order(datum desc) {
    name,
    text,
    datum
}`;

export const EBOOK_QUERY = groq`*[_type == 'ebook'][0]{
    heading,
    text,
    "picture": image.asset->url,
    "file": ebook.asset->url
}`;

export const SUBSCRIPTIONS_QUERY = groq`*[_type == 'subscriptions'] | order(price asc){
    price,
    season,
    stripePriceId
}`;