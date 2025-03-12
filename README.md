This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## WhatsApp Webhook

This project includes a webhook endpoint that receives WhatsApp messages and responds with "pong" for every message.

### Setup Instructions

1. Set up your WhatsApp Business API account at [Meta for Developers](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
2. Create a `.env.local` file with your WhatsApp API credentials:
   ```
   WHATSAPP_VERIFY_TOKEN=your_custom_verification_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   ```
3. Deploy your application or expose your local development server using a tool like [ngrok](https://ngrok.com/):
   ```
   ngrok http 3000
   ```
4. Set up the webhook URL in the WhatsApp Business Platform pointing to your `/api/webhook` endpoint
   ```
   https://your-domain.com/api/webhook
   ```
5. Use the same verification token you set in your `.env.local` file

### How It Works

When a user sends a message to your WhatsApp Business number, the webhook will:

1. Receive the incoming message
2. Extract the sender's phone number
3. Respond with "pong" back to the sender
4. Log the interaction in the console

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
