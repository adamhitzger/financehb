import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const socialFeedType = defineType({
    name: "socialFeed",
    title: "Social feed",
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
            name: "href",
            title: "Odkaz",
            type: "url",
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
        }),
        defineField({
            name: "overview",
            title: "Náhledový text",
            type: "array",
            of: [{type: "block"}],
            validation: (rule) => rule.required(),
        }),
    ]
})
