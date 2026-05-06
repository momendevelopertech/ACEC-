const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service_type?: string;
  lang?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    if (!data.name || !data.name.trim()) {
      return { success: false, error: "Name is required" };
    }

    if (!data.email || !data.email.trim()) {
      return { success: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (!data.message || !data.message.trim()) {
      return { success: false, error: "Message is required" };
    }

    if (data.message.length < 10) {
      return { success: false, error: "Message must be at least 10 characters long" };
    }

    const response = await fetch(`${API_BASE}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        subject: data.subject?.trim() || null,
        message: data.message.trim(),
        service_type: data.service_type || null,
        lang: data.lang || 'ar',
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Failed to send message' };
    }

    return { success: true, message: result.message };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    return { success: false, error: errorMessage };
  }
}
