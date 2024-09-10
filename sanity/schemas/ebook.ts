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
            type: "string"
        }),
        defineField({
            name: "text",
            title: "Overview e-booku",
            type: "array",
            of: [
                {type: "block"},
            ]
        }),
        defineField({
            name: "image",
            title: "Úvodní fotka",
            type: "image"
        }),
        defineField({
            name: "ebook",
            title: "E-book soubor",
            type: "file",
        })
    ]
})