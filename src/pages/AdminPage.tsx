import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { LayoutDashboard, Users, BookOpen, Settings, Search, Plus, Trash2, Edit } from 'lucide-react';
import { INITIAL_COURSES } from '@/data/courses';
import { Enrollment, Course } from '@/types';
import { toast } from 'sonner';

export function AdminPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const savedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    setEnrollments(savedEnrollments);
  }, []);

  const totalRevenue = enrollments.reduce((sum, e) => sum + e.amount, 0);

  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success('Course deleted successfully');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">navstAR ADMIN</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'courses' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <BookOpen className="h-4 w-4" /> Course Management
          </button>
          <button 
            onClick={() => setActiveTab('enrollments')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'enrollments' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <Users className="h-4 w-4" /> Student Enrollments
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <Settings className="h-4 w-4" /> Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-10 w-64 bg-white" placeholder="Search..." />
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              AD
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Students</CardDescription>
                  <CardTitle className="text-3xl font-bold">{enrollments.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-green-600 font-medium">+12% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className="text-3xl font-bold">KSh {totalRevenue.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-green-600 font-medium">+8% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Courses</CardDescription>
                  <CardTitle className="text-3xl font-bold">{courses.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-slate-500 font-medium">Across 3 categories</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending Verification</CardDescription>
                  <CardTitle className="text-3xl font-bold">0</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-slate-500 font-medium">No pending payments</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>Latest student registrations and payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.slice().reverse().map((e) => (
                      <TableRow key={e.id}>
                        <TableCell>
                          <div className="font-medium">{e.studentName}</div>
                          <div className="text-xs text-slate-500">{e.studentPhone}</div>
                        </TableCell>
                        <TableCell>{e.courseTitle}</TableCell>
                        <TableCell>KSh {e.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {e.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">{new Date(e.enrollmentDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {enrollments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-slate-500 italic">
                          No enrollments found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Courses</h2>
              <Button onClick={() => toast.info('Add Course feature coming in Phase 2!')}>
                <Plus className="h-4 w-4 mr-2" /> Add Course
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>KSh {course.price.toLocaleString()} • {course.duration}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'enrollments' && (
          <Card>
            <CardHeader>
              <CardTitle>All Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs">{e.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{e.studentName}</div>
                        <div className="text-xs text-slate-500">{e.studentEmail}</div>
                      </TableCell>
                      <TableCell>{e.courseTitle}</TableCell>
                      <TableCell>
                        <div className="font-medium">KSh {e.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">M-Pesa: {e.studentPhone}</div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Receipt</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Information</CardTitle>
                <CardDescription>Update your school profile and contact details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School Name</Label>
                    <Input defaultValue="navstAR DIGITAL HUB" />
                  </div>
                  <div className="space-y-2">
                    <Label>M-Pesa Till Number</Label>
                    <Input defaultValue="456 789" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Primary Contact Email</Label>
                  <Input defaultValue="info@navstar.hub" />
                </div>
                <div className="space-y-2">
                  <Label>Address/Location</Label>
                  <Input defaultValue="Tech Plaza, 2nd Floor, Nairobi" />
                </div>
                <Button onClick={() => toast.success('Settings saved!')}>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}