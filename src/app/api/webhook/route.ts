import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log('Received message:', body);

    // Example: Extract sender's phone number and message ID
    const senderPhoneNumberId = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;
    const messageId = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id;

    console.log('message:', body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]);
    console.log('Sender phone number ID:', senderPhoneNumberId);
    console.log('Message ID:', messageId);

    if (senderPhoneNumberId) {
        try {
            const url = 'https://graph.facebook.com/v22.0/610897742100486/messages';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer EAAHwcFnbmZA8BO38OlZBOtfyuRuVhptUbtvy7qyhY1TQlC2ZCCkMjqrQiZCVIZARobtYpGVGS06lgoOb62kIlR2zuv83omHOrMrkLDW9j85dLASL2T4OgCtnhc0Cr5iJyyrUS3SW5tagwJRLYZCbN0ZCyz0Lb0gQ3CrXdnLo8e5sUt6e19UzDa70w9AkFumZAtwAYe6EZCOXSowwsdSu2BJBohkOzEwYe0SxrrGEZD',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: '5551992941472',
                    text: {
                        body: 'pong'
                    }
                }),
            });

            if (!response.ok) {
                console.error('Failed to send WhatsApp message:', await response.text());
            }

            const data = await response.json();
            console.log('Sent message:', data);
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
        }
    }

    return NextResponse.json({ status: 'OK' });
}

// Verify webhook endpoint for initial setup with WhatsApp Business API
export async function GET(request: NextRequest) {
    // WhatsApp/Meta typically sends a verification token when you set up a webhook
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // You should replace 'YOUR_VERIFY_TOKEN' with a token you define
    // when setting up your webhook in the WhatsApp/Meta dashboard
    const VERIFY_TOKEN = '1234567890';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        return new Response(challenge, { status: 200 });
    } else {
        console.log('Webhook verification failed');
        return new Response('Verification failed', { status: 403 });
    }
} 