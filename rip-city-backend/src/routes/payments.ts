import express from 'express';
import { stripeService } from '../services/stripeService';

const router = express.Router();

// Get all available subscription plans
router.get('/plans', (req, res) => {
  try {
    const plans = Object.values(stripeService.tiers);
    res.json({
      success: true,
      plans: plans.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        features: plan.features,
        maxAlerts: plan.maxAlerts === -1 ? 'Unlimited' : plan.maxAlerts,
        apiAccess: plan.apiAccess,
        prioritySupport: plan.prioritySupport
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get subscription plans'
    });
  }
});

// Create checkout session for subscription
router.post('/create-checkout', async (req, res) => {
  try {
    const { planId, email, userId } = req.body;

    if (!planId || !stripeService.tiers[planId]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid plan selected'
      });
    }

    const plan = stripeService.tiers[planId];
    
    if (planId === 'free') {
      return res.json({
        success: true,
        message: 'Free plan activated',
        redirectUrl: '/dashboard'
      });
    }

    // Create Stripe customer
    const customer = await stripeService.createCustomer(email, userId);

    // Create checkout session
    const session = await stripeService.createCheckoutSession(
      customer.id,
      plan.priceId,
      `${process.env.FRONTEND_URL || 'https://ripcityticketdispatch.works'}/success?session_id={CHECKOUT_SESSION_ID}`,
      `${process.env.FRONTEND_URL || 'https://ripcityticketdispatch.works'}/pricing?canceled=true`
    );

    res.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url
    });

  } catch (error) {
    console.error('Checkout creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session'
    });
  }
});

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Missing stripe signature' });
  }

  try {
    const event = stripeService.verifyWebhookSignature(
      req.body.toString(),
      signature as string
    );

    console.log('💰 Stripe webhook received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as any;
        console.log('🎉 New subscription completed!', {
          customerEmail: session.customer_details?.email,
          subscriptionId: session.subscription,
          amountTotal: session.amount_total / 100
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as any;
        console.log('✅ Payment succeeded!', {
          subscriptionId: invoice.subscription,
          amountPaid: invoice.amount_paid / 100
        });
        break;

      case 'customer.subscription.deleted':
        const canceledSub = event.data.object as any;
        console.log('🚫 Subscription canceled!', {
          subscriptionId: canceledSub.id,
          customerId: canceledSub.customer
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
});

export default router;
