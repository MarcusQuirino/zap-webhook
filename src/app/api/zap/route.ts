import { NextResponse } from 'next/server';

export async function GET() {
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
                    body: 'Hi there, this is a test message'
                }
            }),
        });

        const data = await response.json();

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send WhatsApp message' },
            { status: 500 }
        );
    }
}