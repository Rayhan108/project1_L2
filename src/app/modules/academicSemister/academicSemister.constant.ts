import {
    TAcademicSemesterCode,
    TAcademicSemesterName,
    TAcademicSemesterNameCodeMapper,
    TMonths,
  } from './academicSemister.interface';
  
  export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const AcademicSemesterName: TAcademicSemesterName[] = [
    'Autumn',
    'Summar',
    'Fall',
  ];
  export const AcademicSemesterSearchableFields = ['name', 'year'];
  export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];
  
  export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };