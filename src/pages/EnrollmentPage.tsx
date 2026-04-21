import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INITIAL_COURSES } from '@/data/courses';
import { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2, QrCode, Phone, Smartphone, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function EnrollmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const found = INITIAL_COURSES.find(c => c.id === id);
    if (found) {
      setCourse(found);
    } else {
      navigate('/courses');
    }
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all fields');
      return;
    }
    setStep(2);
  };

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePayment = () => {
    setPaymentLoading(true);
    // Simulate STK Push or payment verification
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentConfirmed(true);
      toast.success('Payment Received Successfully!');
      
      // Save enrollment to local storage for admin demo
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      enrollments.push({
        id: Math.random().toString(36).substr(2, 9),
        studentName: formData.name,
        studentEmail: formData.email,
        studentPhone: formData.phone,
        courseId: course?.id,
        courseTitle: course?.title,
        amount: course?.price,
        paymentStatus: 'paid',
        enrollmentDate: new Date().toISOString()
      });
      localStorage.setItem('enrollments', JSON.stringify(enrollments));
    }, 3000);
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Enrollment</h1>
            <p className="text-slate-600">Complete the form below to secure your spot in {course.title}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full ${
                  step >= i ? 'bg-primary' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Enter your details as they should appear on your certificate.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleNext} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="0700 000 000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full mt-6">
                          Proceed to Payment
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 2 && !paymentConfirmed && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="border-primary/50 ring-1 ring-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        Online Payment (M-Pesa)
                      </CardTitle>
                      <CardDescription>Pay directly to navstAR DIGITAL HUB Till</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-slate-100 p-6 rounded-xl text-center space-y-2">
                        <p className="text-sm text-slate-500 font-medium">LIPA NA M-PESA TILL NUMBER</p>
                        <p className="text-4xl font-black text-slate-900 tracking-widest">456 789</p>
                        <p className="text-sm font-semibold text-primary">navstAR DIGITAL HUB</p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase text-slate-500">How to pay:</h4>
                        <ol className="text-sm space-y-3 list-decimal list-inside text-slate-700">
                          <li>Go to M-Pesa menu on your phone</li>
                          <li>Select <strong>Lipa Na M-Pesa</strong></li>
                          <li>Select <strong>Buy Goods and Services</strong></li>
                          <li>Enter Till Number: <strong>456 789</strong></li>
                          <li>Enter Amount: <strong>KSh {course.price.toLocaleString()}</strong></li>
                          <li>Enter your M-Pesa PIN and confirm</li>
                        </ol>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg text-amber-800 text-sm">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>After paying, click the button below. We will verify your transaction automatically using your phone number <strong>{formData.phone}</strong>.</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-3">
                      <Button 
                        onClick={handlePayment} 
                        className="w-full h-12 text-lg font-bold" 
                        disabled={paymentLoading}
                      >
                        {paymentLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Verifying Transaction...
                          </span>
                        ) : 'I Have Paid'}
                      </Button>
                      <Button variant="ghost" onClick={() => setStep(1)} disabled={paymentLoading}>
                        Go Back
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {paymentConfirmed && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6"
                >
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Enrollment Confirmed!</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you {formData.name}! You have successfully enrolled in <strong>{course.title}</strong>. 
                    A confirmation email has been sent to {formData.email}.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                    <Button variant="outline" onClick={() => navigate('/courses')}>Browse More Courses</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{course.title}</h4>
                  <p className="text-sm text-slate-500">{course.duration} Duration</p>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Course Fee</span>
                    <span className="font-medium">KSh {course.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Registration</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold text-primary text-xl">KSh {course.price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 text-xs text-slate-500 flex items-center gap-2 rounded-b-xl border-t">
                <ShieldCheck className="h-4 w-4" />
                Secure Payment Powered by M-Pesa
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}