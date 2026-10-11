import * as z from "zod";

export const inquiryTypes = [
  { value: "project", label: "Project / Freelance Inquiry" },
  { value: "fulltime", label: "Full-Time Hiring" },
  { value: "consulting", label: "Technical Consulting & Architecture" },
  { value: "general", label: "General Discussion & Collaboration" },
] as const;

export type InquiryTypeValue = (typeof inquiryTypes)[number]["value"];

export const budgetRanges = [
  { value: "not_applicable", label: "Not Applicable / Undecided" },
  { value: "under_1k", label: "< $1,000 USD" },
  { value: "1k_3k", label: "$1,000 - $3,000 USD" },
  { value: "3k_5k", label: "$3,000 - $5,000 USD" },
  { value: "5k_plus", label: "$5,000+ USD" },
] as const;

export type BudgetRangeValue = (typeof budgetRanges)[number]["value"];

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name must not exceed 80 characters." })
    .regex(/^[a-zA-Z\s.'\-\u0980-\u09FF]+$/, {
      message: "Name can only contain letters, spaces, hyphens and dots.",
    }),

  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters." })
    .max(120, { message: "Email must not exceed 120 characters." })
    .email({ message: "Please provide a valid email address." }),

  inquiryType: z.enum(["project", "fulltime", "consulting", "general"]),

  budget: z.enum(["not_applicable", "under_1k", "1k_3k", "3k_5k", "5k_plus"]),

  subject: z
    .string()
    .max(120, { message: "Subject must not exceed 120 characters." })
    .optional(),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2500, { message: "Message must not exceed 2,500 characters." }),

  // Multi-layered Bot Protection Fields
  honeypot: z.string().optional(),
  securityToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
