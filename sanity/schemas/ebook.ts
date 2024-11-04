import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const ebookType = defineType({
    name: "ebook",
    title: "Úprava stránky e-book",
    type: "document",
    icon: BookIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Nadpis",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "text",
            title: "Overview e-booku",
            type: "array",
            of: [
                {type: "block"},
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Úvodní fotka",
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
            name: "ebook",
            title: "E-book soubor",
            type: "file",
            validation: (rule) => rule.required(),
        })
    ]
})