import { defineType, defineField, defineArrayMember } from "sanity"

export const realityType = defineType({
    name: "reality",
    title: "Nové nemovitosti",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Název nemovitosti",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Url adresa",
            type: "slug",
            options: {
                source: "name"
            },
        }),
        defineField({
            name: "overview",
            title: "Náhledový text na hl. stránce",
            type: "string",
        }),
        defineField({
            name: "street",
            title: "Ulice",
            type: "string",
        }),
        defineField({
            name: "street_number",
            title: "Číslo popisné",
            type: "string",
        }),
        defineField({
            name: "city",
            title: "Obec",
            type: "string",
        }),
        defineField({
            name: "postcode",
            title: "PSČ",
            type: "string",
        }),
        defineField({
            name: "details",
            title: "Popis nemovitosti",
            type: "array",
            of: [
                {
                    type: "block"
                },
                {
                    type: "image",
                },
            ]
        }),
        defineField({
            name: "image",
            title: "Hlavní fotka",
            type: "image",
        }),
        defineField({
            name: "gallery",
            title: "Galerie fotek",
            type: "array",
            of: [
                {type: "image",
                }
            ]
        }),
        
        defineField({
            name: "floor_plan",
            title: "Územní plán",
            type: "image",
        }),
        defineField({
            name: "house_plan",
            title: "Plán domu",
            type: "image",
        }),
        defineField({
            name: "price",
            title: "Cena",
            type: "string",
        }),
        defineField({
            name: "area",
            title: "Rozloha",
            type: "number"
        }),
        defineField({
            name: "geopoint",
            title: "Lokace",
            type: "geopoint",
        }),
        defineField({
            name: "status",
            title: "Status nemovitosti",
            type: "string",
            options: {
                list: ["Na prodej", "K pronájmu", "Prodáno", "Storno"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "type",
            title: "Typ nemovitosti",
            type: "string",
            options: {
                list: ["Byt", "Rodinný dům"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "equipment",
            title: "Vybavení nemovitosti",
            type: "string",
            options: {
                list: ["Kompletní", "Částečné", "Žádné"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "garage",
            title: "Garáž",
            type: "string",
            options: {
                list: ["Ano", "Ne"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "parking",
            title: "Parkování",
            type: "string",
            options: {
                list: ["Venkovní", "Vnitřní", "Žádné"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "owner",
            title: "Vlastnictví",
            type: "string",
            options: {
                list: ["Vlastní", "Družstvo"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "material",
            title: "Materiál stavby",
            type: "string",
            options: {
                list: ["Cihlová", "Dřevostavba"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "condition",
            title: "Stav nemovitosti",
            type: "string",
            options: {
                list: ["Velmi pěkný", "Pěkný", "Špatný", "Velmi špatný"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "water",
            title: "Voda",
            type: "string",
            options: {
                list: ["Dálkový odvod", "Studna", "Vlastní"],
                layout: "dropdown",
            }
        }),
        defineField({
            name: "heating",
            title: "Topení",
            type: "string",
            options: {
                list: ["Ústřední topení", "Tuhá paliva", "Vlastní"],
                layout: "dropdown",
            }
        }),
    ]
})