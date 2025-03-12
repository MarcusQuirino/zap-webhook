import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log('Received webhook data:', JSON.stringify(data, null, 2));

        return NextResponse.json({
            status: 'success',
            message: 'Webhook received, but no messages found'
        });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { status: 'error', message: 'Failed to process webhook' },
            { status: 500 }
        );
    }
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