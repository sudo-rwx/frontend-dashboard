import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-08-27.basil"
});

// Pricing plans (SaaS tiers)
export const PLANS = {
  starter: {
    name: "Starter",
    price: 9,
    priceId: process.env.STRIPE_PRICE_STARTER || ""
  },
  pro: {
    name: "Pro",
    price: 29,
    priceId: process.env.STRIPE_PRICE_PRO || ""
  },
  business: {
    name: "Business",
    price: 79,
    priceId: process.env.STRIPE_PRICE_BUSINESS || ""
  }
};