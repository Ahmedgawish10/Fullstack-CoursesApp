import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '';

const stripe = new Stripe(stripeSecretKey, {
  typescript: true,
  apiVersion: "2023-08-16",
});
export async function POST(request: any) {
  const data: any = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}