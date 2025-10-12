import { nameRegex } from '@/helper/general';
import { z } from 'zod';

const usFormattedPhoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').regex(nameRegex, 'First name must contain only letters'),
  lastName: z.string().min(1, 'Last name is required').regex(nameRegex, 'Last name must contain only letters'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .optional()
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || usFormattedPhoneRegex.test(val), {
      message: 'Enter a valid US phone number',
    }),
  companyId: z.number().optional(),
  country: z.string().optional(),
  street: z.string().optional(),
  zipCode: z.string().optional(),
});

export const contactFilterSchema = z.object({
  
  fullName: z
    .string()
    .optional()
    .refine((val) => !val || nameRegex.test(val), {
      message: 'First name must contain only letters',
    }),
  email: z
    .string()
    .optional(),
  phone: z
    .string()
    .optional(),
  companyId: z.number().optional(),
  dateCreated: z.date().optional()
});
