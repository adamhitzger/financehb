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
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Url adresa",
            type: "slug",
            options: {
                source: "name"
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "overview",
            title: "Náhledový text na hl. stránce",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "street",
            title: "Ulice",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "street_number",
            title: "Číslo popisné",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "city",
            title: "Obec",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "postcode",
            title: "PSČ",
            type: "string",
            validation: (rule) => rule.required(),
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
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Hlavní fotka",
            type: "image",
            fields: [
                {
                    
                                name: "alt",
                                title: "Alt",
                                type: "string",
                              },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "gallery",
            title: "Galerie fotek",
            type: "array",
            of: [
                {type: "image",
                    fields: [
                        {
                            
                                        name: "alt",
                                        title: "Alt",
                                        type: "string",
                                      },
                    ],
                }
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "price",
            title: "Cena",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "area",
            title: "Rozloha",
            type: "number",
            validation: (rule) => rule.required(),
        }),
    ]
})