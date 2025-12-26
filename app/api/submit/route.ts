import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const { message, files } = await request.json();

        // For now, we'll use a simple email service
        // You'll need to set up environment variables for production
        const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'kumarrutkarsh@gmail.com';

        // Prepare email content
        const emailContent = {
            to: RECIPIENT_EMAIL,
            subject: 'New Idea Submission from DevCult',
            message: message,
            files: files || [],
            timestamp: new Date().toISOString(),
        };

        // In production, you would use a service like Resend, SendGrid, or Nodemailer
        // For now, we'll log it and return success
        console.log('Email submission:', emailContent);

        // Integrate with Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'DevCult <onboarding@resend.dev>',
            to: RECIPIENT_EMAIL,
            subject: 'New Idea Submission from DevCult',
            html: `
            <h2>New Submission</h2>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            ${files && files.length > 0 ? `<p><strong>Attachments:</strong> ${files.length} file(s)</p>` : ''}
          `,
        });

        return NextResponse.json(
            { success: true, message: 'Submission received!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to submit' },
            { status: 500 }
        );
    }
}
