
export enum ThemeMode {
  COLOR = 'color',
  GRAYSCALE = 'grayscale'
}

export interface TagColors {
  background: string;
  border: string;
  schoolName: string;
  subject: string;
  studentName: string;
  grade: string;
}

export interface TagData {
  studentName: string;
  grade: string;
  schoolName: string;
  schoolLogo: string | null;
  mode: ThemeMode;
  colors: TagColors;
}

export interface Subject {
  id: string;
  name: string;
  category: string;
}

export interface SchoolPreset {
  id: string;
  name: string;
  logo: string;
}
