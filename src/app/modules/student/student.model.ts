import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameValidationSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20 charecter'],
    // validate: function (value: string) {
    //   const firstNameStr =
    //     value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //   return firstNameStr === value;
    // },
  },
  middleName: {
    type: String,
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalized format',
    // },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianValidationSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    // required: [true, "Father's name is required"],
    required: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    // required: [true, "Mother's name is required"],
    required: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    // required: [true, "Mother's occupation is required"],
    required: true,
    trim: true,
  },
  motherContactNo: {
    type: String,
    // required: [true, "Mother's contact number is required"],
    required: true,
    trim: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    // required: [true, "Local guardian's name is required"],
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    // required: [true, "Local guardian's occupation is required"],
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    // required: [true, "Local guardian's contact number is required"],
    required: true,
    trim: true,
  },
  address: {
    type: String,
    // required: [true, "Local guardian's address is required"],
    required: true,
    trim: true,
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    // required: [true, 'Student ID is required'],
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: userNameValidationSchema,
    // required: [true, 'Name is required'],
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
    // required: [true, 'Gender is required'],
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    // required: [true, 'Email is required'],
    required: true,
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  contactNo: {
    type: String,
    // required: [true, 'Contact number is required'],
    required: true,
  },
  emergencyContactNo: {
    type: String,
    // required: [true, 'Emergency contact number is required'],
    required: true,
  },
  bloogGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    // required: [true, 'Present address is required'],
    required: true,
    trim: true,
  },
  permanentAddres: {
    type: String,
    // required: [true, 'Permanent address is required'],
    required: true,
    trim: true,
  },
  guardian: {
    type: guardianValidationSchema,
    // required: [true, 'Guardian details are required'],
    required: true,
    trim: true,
  },
  localGuardian: {
    type: localGuradianSchema,
    // required: [true, 'Local guardian details are required'],
    required: true,
    trim: true,
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status',
    },
    trim: true,
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
