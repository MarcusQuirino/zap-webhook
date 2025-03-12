import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from './whatsapp';

/**
 * Webhook endpoint to handle incoming WhatsApp messages
 * This endpoint will respond with "pong" to every message received
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the incoming webhook data
        const data = await request.json();
        console.log('Received webhook data:', JSON.stringify(data, null, 2));

        // Check if this is a WhatsApp message
        // Most WhatsApp business APIs will have messages in an array
        const messages = data.messages || data.entry?.[0]?.changes?.[0]?.value?.messages;

        if (messages && messages.length > 0) {
            // Extract sender information
            const sender = messages[0].from ||
                data.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id ||
                'unknown';

            console.log(`Received message from ${sender}, responding with pong`);

            // Send the "pong" response back to the sender
            const responseResult = await sendWhatsAppMessage(sender, 'pong');

            if (responseResult) {
                console.log('Successfully sent pong response:', responseResult);
            } else {
                console.error('Failed to send pong response to', sender);
            }

            return NextResponse.json({
                status: 'success',
                message: 'Processed incoming message and sent pong response',
                to: sender,
                responseStatus: responseResult ? 'sent' : 'failed'
            });
        }

        // If no messages were found, return a general acknowledgment
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
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        return new Response(challenge, { status: 200 });
    } else {
        console.log('Webhook verification failed');
        return new Response('Verification failed', { status: 403 });
    }
} 