import { User as SupabaseUser } from "@supabase/supabase-js";
import React from "react";

export type RaynetResponse = {
success: string;
totalCount: number;
data: {
  id: number;
};
};

export type FullUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    stripe_id: string | null;
    raynet_id: number | null;
    is_mail_sub: boolean
}

export interface ActionResponse<T> {
    success: boolean;
    message: string;
    submitted: boolean;
    errors?: {
        [K in keyof T]?: string[];
    };
    inputs?: T;
}


export type GetRaynetResponse = {
    success: string;
    totalCount: number;
    data: DataItem[];
}

interface DataItem {
    id: number;
}


type DBStatus = "Aktivní" | "Zrušené" |"Neaktivní";
export type DBUser = {
  id: string;
  email?: string;
  name: string;
  surname: string;
  stripeId: string;
  raynet_id: number;
  isMailSub: boolean;
};

export type DBSubscriptions = {
    id: string;
    user_id: string;
    stripe_subscriptions_id: string;
    period_start: number;
    period_end: number;
    status: DBStatus;
    interval: string;
    plan_id: string;
}

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
    stripePriceId: string
    yrlStripePriceId: string;
    funnyText: string
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
    icon?: React.ReactNode;
    type: "img" | "iframe";
    mediaSrc: string;
    src: string;
}


export interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
  }

  export interface Reality {
    name: string; 
    slug: {
        current: string;
    };
    overview: any;
    street: string;
    street_number: string;
    city: string;
    postcode: string;
    details: any;
    imageUrl: string;
    galleryUrls: string[];
    price: string;
    area: number;
};

export interface Socialfeed {
    name: string;
    href: string;
    img: string;
    overview: any
};