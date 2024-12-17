import { z } from "zod";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

export const formSchema = z.object({
  first_name: z
    .string()
    .min(4, "First name must be at least 4 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name cannot contain special characters"),
  second_name: z
    .string()
    .min(4, "Last name must be at least 4 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name cannot contain special characters"),
  emp_id: z
    .string()
    .min(1, "Employee ID is required")
    .max(10, "Employee ID must be less than 10 characters")
    .regex(/^[a-zA-Z0-9]*$/, "Employee ID must be alphanumeric"),
  email: z.string().email("Invalid email format"),
  phone_no: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]*$/, "Phone number must contain only numbers"),
  dept: z.string().min(1, "Department is required"),
  doj: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => date <= today, {
      message: "Date of joining must be less than or equal to today's date",
    }),
  role: z
    .string()
    .min(1, "Role is required")
    .regex(/^[a-zA-Z\s]*$/, "Role cannot contain special characters"),
});
