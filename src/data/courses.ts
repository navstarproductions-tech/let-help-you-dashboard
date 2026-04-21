import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computers',
    description: 'Learn the basics of computer hardware, software, and operating systems. Perfect for beginners.',
    price: 5000,
    duration: '4 Weeks',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8fb27cb6-b5e4-4e3a-a9bd-86137cc28585/course-intro-computers-42a165e8-1776781004843.webp',
    category: 'Computer School'
  },
  {
    id: '2',
    title: 'Graphics Design Mastery',
    description: 'Master Photoshop, Illustrator, and Canva to create stunning visual content for any brand.',
    price: 15000,
    duration: '8 Weeks',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8fb27cb6-b5e4-4e3a-a9bd-86137cc28585/course-graphics-design-e5369114-1776780999971.webp',
    category: 'Professional'
  },
  {
    id: '3',
    title: 'Full-Stack Web Development',
    description: 'Build modern responsive websites using React, Node.js, and MongoDB. From zero to hero.',
    price: 25000,
    duration: '12 Weeks',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8fb27cb6-b5e4-4e3a-a9bd-86137cc28585/course-web-dev-7e7221eb-1776780999188.webp',
    category: 'Professional'
  },
  {
    id: '4',
    title: 'Cyber Security Essentials',
    description: "Learn to protect systems and networks from digital attacks. A high-demand skill in today's world.",
    price: 30000,
    duration: '10 Weeks',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8fb27cb6-b5e4-4e3a-a9bd-86137cc28585/course-cyber-security-1e20006c-1776780999856.webp',
    category: 'Computer School'
  }
];