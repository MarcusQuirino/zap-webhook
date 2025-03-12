/**
 * Utility functions for interacting with the WhatsApp Business API
 */

// Types for WhatsApp API responses and requests
interface WhatsAppMessageResponse {
    messaging_product: string;
    contacts: Array<{ input: string; wa_id: string }>;
    messages: Array<{ id: string }>;
}

interface WhatsAppMessageRequest {
    messaging_product: string;
    recipient_type: string;
    to: string;
    type: string;
    text?: {
        body: string;
    };
}

/**
 * Send a text message to a WhatsApp user
 * 
 * @param recipientPhone - The recipient's phone number (with country code, no + or spaces)
 * @param message - The text message to send
 * @returns Promise with the API response
 */
export async function sendWhatsAppMessage(recipientPhone: string, message: string): Promise<WhatsAppMessageResponse | null> {
    try {
        // Check if required environment variables are set
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

        if (!phoneNumberId || !accessToken) {
            console.error('Missing required environment variables for WhatsApp API');
            return null;
        }

        // Prepare the message payload
        const payload: WhatsAppMessageRequest = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhone,
            type: 'text',
            text: {
                body: message
            }
        };

        // Make the API request to WhatsApp
        const response = await fetch(
            `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`WhatsApp API error (${response.status}): ${errorText}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return null;
    }
} 