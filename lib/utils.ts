import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string";
import { UrlQueryParams } from "@/types";
import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY! as string,
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
) => {
  console.error(error);
  let errorMessage = defaultMessage;
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message;
  }
  return errorMessage;
};