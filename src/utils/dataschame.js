import { z } from "zod";

/**





Velocity Transit: Kinetic Precision Validation Schemas



Optimized for logistics-grade security and user experience.
 */

// --- SHARED RULES ---
const passwordRules = z
  .string()
  .min(8, { message: "Security protocol requires at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Include at least one uppercase letter for kinetic depth",
  })
  .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Include at least one numerical digit" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Include at least one special character for precision",
  });

// --- AUTH SCHEMAS ---

export const validatedSignUpSchema = z
  .object({
    fullname: z.string().min(3, {
      message: "Personnel name must be at least 3 characters for verification",
    }),
    email: z
      .string()
      .email({ message: "Invalid transit terminal email address" }),
    password: passwordRules,
    confirmPassword: passwordRules,
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Velocity Transit Service Agreement",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Security credentials do not match",
    path: ["confirmPassword"],
  });

export const validatedSignInSchema = z.object({
  email: z.string().email({ message: "Enter a valid operator email" }),
  password: z.string().min(1, { message: "Access key is required" }),
});

export const validateAccountSchema = z.object({
  verificationToken: z
    .string()
    .min(6, { message: "Kinetic Sync code must be 6 digits" })
    .max(6, { message: "Kinetic Sync code must be 6 digits" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Terminal email is required for recovery" }),
});

export const validateResetPasswordSchema = z
  .object({
    password: passwordRules,
    confirmPassword: passwordRules,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "New credentials do not match",
    path: ["confirmPassword"],
  });

// --- PROFILE & USER SCHEMAS ---

export const updatePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Current access key required" }),
    newPassword: passwordRules,
    confirmPassword: passwordRules,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirmation does not match new access key",
    path: ["confirmPassword"],
  });

export const validateUserSchema = z.object({
  fullname: z.string().min(3, { message: "Full legal name required" }),
  email: z.string().email({ message: "Valid contact email required" }),
  phone: z
    .string()
    .min(10, { message: "Provide a 10-digit operational contact number" }),
  dateOfBirth: z.string().date({ message: "Enter a valid date of birth" }),
});

// --- LOGISTICS SPECIFIC SCHEMAS (Added for Velocity context) ---

export const validateShipmentSchema = z.object({
  senderName: z.string().min(1, "Sender identification required"),
  receiverName: z.string().min(1, "Recipient identification required"),
  origin: z.string().min(1, "Origin terminal required"),
  destination: z.string().min(1, "Destination terminal required"),
  serviceLevel: z.enum(["Flash", "Sky", "White Glove", "Green"]),
  parcelWeight: z.number().positive("Weight must be greater than 0kg"),
});
