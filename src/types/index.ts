export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: 'Computer School' | 'Cyber Services' | 'Professional';
}

export interface Enrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  paymentStatus: 'pending' | 'paid';
  enrollmentDate: string;
}

export interface SiteSettings {
  tillNumber: string;
  schoolName: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
}