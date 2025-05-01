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
            title: "Cena předplatného",
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
            name: "stripePriceId",
            title: "ID linku ze Stripu",
            type: "string",
            validation: (rule) => rule.required(),
        }),
    ]
})