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
        }),
        defineField({
            name: "season",
            title: "Doba předplatného",
            type: "string",
        }),
        defineField({
            name: "stripePriceId",
            title: "ID linku ze Stripu",
            type: "string",
        }),
    ]
})