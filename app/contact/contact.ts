import { ID } from "appwrite";
import {
  databases,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
} from "@/utils/appwrite";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sms_consent?: boolean;
}

export const submitContactForm = async (formData: ContactFormData) => {
  if (!databases) {
    throw new Error("Appwrite client not initialized");
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

    return response;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
