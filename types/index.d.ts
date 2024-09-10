import { User as SupabaseUser } from "@supabase/supabase-js";

export type DBUser = {
  id: string;
  email?: string;
  name: string;
  surname: string;
};

export type User = SupabaseUser & DBUser;

export interface Ebook {
    heading: string;
    text: any;
    picture: string;
    file: string;
}

export interface Reviews {
    name: string;
    text: any;
    datum: string;
}

export interface Subscriptions {
    price: number;
    season: string;
}

export interface Articles {
    name: string;
    slug : string;
    picture: string;
    datum: string;
    overview: any;
}

export interface Article {
    name: string;
    slug : string;
    picture: string;
    datum: string;
    overview: any;
    unpaid_text: any;
    paid_text : any;
}

export interface Links {
    name: string;
    route: string;
}

export interface Service {
    heading: string;
    text: string;
}

export interface SocialNetwork {
    heading: string;
    value: string;
    href: string;
    text: string;
}

export interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
  }