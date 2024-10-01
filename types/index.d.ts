import { User as SupabaseUser } from "@supabase/supabase-js";

type Heating = "Ústřední topení" | "Tuhá paliva" | "Vlastní";
type Water = "Dálkový odvod" | "Studna" | "Vlastní";
type Condition = "Velmi pěkný" | "Pěkný" | "Špatný" | "Velmi špatný";
type Material = "Cihlová" | "Dřevostavba";
type Owner = "Vlastní" | "Družstvo";
type Gargae = "Ano" | "Ne";
type Parking = "Venkovní" | "Vnitřní" | "Žádné";
type Equipment = "Kompletní" | "Částečné" | "Žádné";
type Type = "Byt" |"Rodinný dům";
type Realtor = "Lukáš Hrdina" | "Michal Pros" | "Petra Prosová";
type Status =  "Na prodej" | "K pronájmu" | "Prodáno" | "Storno";
type DBStatus = "Aktivní" | "Zrušené" |"Neaktivní";
export type DBUser = {
  id: string;
  email?: string;
  name: string;
  surname: string;
  stripeId: string;
};

export type DBSubscriptions = {
    id: string;
    userid: string;
    stripeSubsId: string;
    periodStart: number;
    periodEnd: number;
    status: DBStatus;
    interval: string;
    planId: string;
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
    stripePriceId: string;
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

  export interface Reality {
    name: string; 
    slug: {
        current: string;
    };
    overview: string;
    street: string;
    street_number: string;
    city: string;
    postcode: string;
    details: any;
    imageUrl: string;
    galleryUrls: string[];
    planUrl: string; 
    houseUrl: string
    price: string;
    area: number;
    geopoint: {
        _type: string;
        lng: number;
        lat: number;
        alt: number;
    };
    status: Status;
    realtor: Realtor;
    type: Type;
    material: Material;
    equipment: Equipment;
    garage: Gargae;
    parking: Parking;
    owner: Owner;
    condition: Condition;
    water: Water;
    heating: Heating;
};