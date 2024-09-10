import { groq } from "next-sanity";

export const COUNT_ARTICLES = groq`count(*[_type == 'article' && isFullyPaid == false])`;
export const COUNT_ALL_ARTICLES = groq`count(*[_type == 'article'])`;

export const ARTICLES_QUERY = groq`*[_type == 'article' && isFullyPaid == false] | order(priority desc, _createdAt desc)[$start..$end]{
    name,
    "slug": slug.current,
    "picture": foto.asset->url,
    datum,
    overview,
}`;

export const HOME_ARTICLES_QUERY = groq`*[_type == 'article' && isFullyPaid == false] | order(priority desc,_createdAt desc)[0..3] {
    name,
    "slug": slug.current,
    "picture": foto.asset->url,
    datum,
    overview,
}`;

export const ALL_ARTICLES_QUERY = groq`*[_type == 'article'] | order(priority desc,_createdAt desc)[$start..$end]{
    name,
    "slug": slug.current,
    "picture": foto.asset->url,
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
    season
}`;