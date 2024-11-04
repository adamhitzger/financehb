import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
    name: "review",
    title: "Správa hodnocení",
    type: "document",
    icon: StarIcon,
    fields: [
     defineField({
        name: "name",
        title: "Celé jméno",
        type: "string",
        validation: (rule) => rule.required(),
     }),
     defineField({
        name: "text",
        title: "Hodnocení od klienta",
        type: "array",
        of: [
            {type: "block"}
        ],
        validation: (rule) => rule.required(),
     })   ,
     defineField({
        name: "datum",
        title: "Datum",
        type: "date",
        validation: (rule) => rule.required(),
     })
    ]
})