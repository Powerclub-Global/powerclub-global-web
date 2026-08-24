import { ID } from "appwrite";
import {
  databases,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
} from "@/utils/appwrite";
import { getAttribution } from "@/lib/attribution";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sms_consent?: boolean;
}

// Relay the lead to the PCG dashboard CRM. Best-effort: a CRM outage must
// never block the user's submission, which still lands in Appwrite.
const relayToCrm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        sourcePage:
          typeof window !== "undefined" ? window.location.pathname : "/contact",
        attribution: getAttribution(),
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("CRM relay failed:", error);
    return false;
  }
};

export const submitContactForm = async (formData: ContactFormData) => {
  if (!databases) {
    // Appwrite unavailable — the CRM relay becomes the primary write.
    const captured = await relayToCrm(formData);
    if (!captured) {
      throw new Error("Could not submit your message. Please try again.");
    }
    return null;
  }

  try {
    const response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        ...formData,
        createdAt: new Date().toISOString(),
      }
    );

    await relayToCrm(formData);
    return response;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    // Appwrite write failed — the lead still counts if the CRM captured it.
    const captured = await relayToCrm(formData);
    if (!captured) {
      throw error;
    }
    return null;
  }
};
