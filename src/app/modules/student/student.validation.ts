import { z } from "zod";

// Custom capitalization validation function
const capitalizeValidation = (value: string | undefined): boolean => {
    if (!value) return true; // Allow undefined or empty strings (handled by Zod itself for required fields)
    const formattedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return formattedValue === value;
  };
  // UserName Schema
  const userNameValidatorSchema = z.object({
    firstName: z
      .string()
      .trim()
      .max(20, 'First name cannot be more than 20 characters')
      .nonempty('First name is required')
      .refine(capitalizeValidation, {
        message: 'First name must be capitalized (e.g., John)',
      }),
    middleName: z
      .string()
      .trim()
      .optional()
      .refine(capitalizeValidation, {
        message: 'Middle name must be capitalized (e.g., Doe)',
      }),
    lastName: z
      .string()
      .trim()
      .nonempty('Last name is required')
      .refine(capitalizeValidation, {
        message: 'Last name must be capitalized (e.g., Smith)',
      }),
  });
  
  // Guardian Schema
  const guardianValidatorSchema = z.object({
    fatherName: z.string().trim().nonempty("Father's name is required"),
    fatherOccupation: z.string().trim().nonempty("Father's occupation is required"),
    fatherContactNo: z.string().trim().nonempty("Father's contact number is required"),
    motherName: z.string().trim().nonempty("Mother's name is required"),
    motherOccupation: z.string().trim().nonempty("Mother's occupation is required"),
    motherContactNo: z.string().trim().nonempty("Mother's contact number is required"),
  });
  
  // Local Guardian Schema
  const localGuardianValidatorSchema = z.object({
    name: z.string().trim().nonempty("Local guardian's name is required"),
    occupation: z.string().trim().nonempty("Local guardian's occupation is required"),
    contactNo: z.string().trim().nonempty("Local guardian's contact number is required"),
    address: z.string().trim().nonempty("Local guardian's address is required"),
  });
  
  // Main Student Schema
  const createStudentValidationSchema = z.object({
    body: z.object({
      password: z.string().max(20),
      student: z.object({
        name: userNameValidatorSchema,
        gender: z.enum(['male', 'female', 'other']),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        guardian: guardianValidatorSchema,
        localGuardian: localGuardianValidatorSchema,
        admissionSemester: z.string(),
        profileImg: z.string(),
      }),
    }),
  });
  export const studentValidations = {
    createStudentValidationSchema,
  };
  