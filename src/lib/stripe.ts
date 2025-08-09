import Stripe from 'stripe'

// Initialize Stripe client conditionally to avoid build errors
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : null

export const PLANS = {
  FREE: {
    name: 'Free',
    credits: 3,
    price: 0,
  },
  HOBBY: {
    name: 'Hobby',
    priceId: process.env.STRIPE_HOBBY_PRICE_ID,
    price: 9,
    features: [
      'Unlimited AI generations',
      'Priority support',
      'Advanced analytics',
    ],
  },
  PRO: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    price: 29,
    features: [
      'Everything in Hobby',
      'Team collaboration',
      'API access',
      'Custom integrations',
    ],
  },
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe client not initialized. Please set STRIPE_SECRET_KEY environment variable.')
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  })

  return session
}

export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe client not initialized. Please set STRIPE_SECRET_KEY environment variable.')
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}