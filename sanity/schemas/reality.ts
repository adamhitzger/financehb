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
            name: "price",
            title: "Cena",
            type: "string",
        }),
        defineField({
            name: "area",
            title: "Rozloha",
            type: "number"
        }),
    ]
})