
import { Subject, TagColors, SchoolPreset } from './types';

export const PRESET_SCHOOLS: SchoolPreset[] = [
  { 
    id: 'dns', 
    name: 'Dhammissara College Nattandiya', 
    logo: 'https://i.ibb.co/sp3kPLDj/cropped-dns-logo.png' 
  },
  { 
    id: 'jp2', 
    name: 'St John Paul II Cambridge College, Wennappuwa', 
    logo: 'https://i.ibb.co/yD3BCt1/John-paul.png' 
  }
];

export const SRI_LANKAN_SUBJECTS: Subject[] = [
  { id: 'rel', name: 'Religion', category: 'Core' },
  { id: 'mat', name: 'Mathematics', category: 'Core' },
  { id: 'sci', name: 'Science', category: 'Core' },
  { id: 'eng', name: 'English', category: 'Core' },
  { id: 'sin', name: 'Sinhala', category: 'Core' },
  { id: 'tam', name: 'Tamil', category: 'Core' },
  { id: 'his', name: 'History', category: 'Core' },
  { id: 'geo', name: 'Geography', category: 'Core' },
  { id: 'bud', name: 'Buddhism', category: 'Religion' },
  { id: 'hin', name: 'Hinduism', category: 'Religion' },
  { id: 'isl', name: 'Islam', category: 'Religion' },
  { id: 'chr', name: 'Christianity', category: 'Religion' },
  { id: 'cit', name: 'Civics', category: 'General' },
  { id: 'hpe', name: 'Health & PE', category: 'General' },
  { id: 'art', name: 'Art', category: 'Aesthetic' },
  { id: 'mus', name: 'Music', category: 'Aesthetic' },
  { id: 'dan', name: 'Dancing', category: 'Aesthetic' },
  { id: 'ict', name: 'ICT', category: 'General' },
  { id: 'acc', name: 'Accounting', category: 'AL' },
  { id: 'bst', name: 'Business Studies', category: 'AL' },
  { id: 'eco', name: 'Economics', category: 'AL' },
];

export const DEFAULT_COLORS: TagColors = {
  background: '#ffffff',
  border: '#2563eb',
  schoolName: '#64748b',
  subject: '#1e3a8a',
  studentName: '#000000',
  grade: '#1e40af'
};

export const GRAYSCALE_COLORS: TagColors = {
  background: '#ffffff',
  border: '#000000',
  schoolName: '#666666',
  subject: '#000000',
  studentName: '#000000',
  grade: '#000000'
};
