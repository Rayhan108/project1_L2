import Joi from 'joi';
//creatin a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.base': 'First name must be in capitalized format',
    }),
  middleName: Joi.string()
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .optional()
    .messages({
      'string.pattern.base': 'Middle name must be in capitalized format',
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name must contain only letters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': "Mother's contact number is required",
  }),
});

const localguardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a valid gender',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email type',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloogGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddres: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGuardian: localguardianValidationSchema.required().messages({
    'any.required': 'Local guardian details are required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});
export default studentValidationSchema;
