import { CreditCardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const subsType = defineType({
    name: "subscriptions",
    title: "Předplatné",
    icon: CreditCardIcon,
    type: "document",
    fields: [
        defineField({
            name: "price",
            title: "Cena předplatného mesicne",
            type: "number",
            validation: (rule) => rule.required(),
        }),
       
        defineField({
            name: "season",
            title: "Název a doba předplatného",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "funnyText",
            title: "Vtipný text",
            type: "string",
        }),
        defineField({
            name: "stripePriceId",
            title: "ID linku ze Stripu na měsíc",
            type: "string",
        }),
    ]
})