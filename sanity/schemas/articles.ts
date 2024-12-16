import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleType = defineType({
    name: "article",
    title: "Články",
    type: "document",
    icon: BlockContentIcon,
    fields: [
        defineField({
            name: "name",
            title: "Název článku",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "priority",
            title: "Priorita článku",
            type: "number",
        }),
        defineField({
            name: "slug",
            title: "Url adresa",
            type: "slug",
            options: {
                source: "name",
            },
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
            name: "foto",
            type: "image",
            title: "Náhledová fotka",
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
            name: "datum",
            type: "date",
            title: "Datum publikování článku",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "overview",
            title: "Náhledový text",
            type: "array",
            of: [{type: "block"}],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "isFullyPaid",
            title: "Článek kompletně za paywallem",
            type: "boolean",
        }),
        defineField({
            name: "unpaid_text",
            title: "Obsah článku zadarmo",
            type: "array",
            of: [
                {type: "block"},
                {type:"image",
                    fields: [
                        {
                            name: "alt",
                            title: "Alt",
                            type: "string",
                          },
                    ]
                }
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "paid_text",
            title: "Obsah článku za paywallem",
            type: "array",
            of: [{type: "block"},
                {type:"image",
                    fields: [
                        {
                            name: "alt",
                            title: "Alt",
                            type: "string",
                          },
                    ]
                }
            ],
        }),
        defineField({
            name: "files",
            title: "Soubory k článku",
            type:"array",
            of: [
                {type: "file"},
            ]
        }),
    ]
})