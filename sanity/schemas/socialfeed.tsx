import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const soiclaFeedType = defineType({
    name: "soiclaFeed",
    title: "Social feed",
    type: "document",
    icon: BlockContentIcon,
    fields: [
        defineField({
            name: "name",
            title: "Název článku",
            type: "string",
        }),
        defineField({
            name: "href",
            title: "Odkaz",
            type: "link",
        }),
        defineField({
            name: "image",
            title: "Hlavní fotka",
            type: "image"
        }),
        defineField({
            name: "overview",
            title: "Náhledový text",
            type: "array",
            of: [{type: "block"}]
        }),
    ]
})