// Sidebar response

interface SidebarResponse {
  statusCode: number;
  statusMessage: string;
  data: [
      {
        name: string;
        url: string;
        requiredPermissoions : string[]
    }
  ]
}

// Dashboard data and response

interface DashboardResponse {
    statusCode: number;
    statusMessage: string;
    data: {
      totalUsers: number;
      totalTutors: number;
      totalStudents: number;
      totalAmountInPaybill: number;
    };
  }

// User data and response

interface UserData {
  userType: 'Student' | 'Tutor';
  date: string;
  count: number; 
}

interface ActiveUserResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    timePeriod: string;
    studentData: UserData[];
    tutorData: UserData[];
  }
}

// Registration data and response

interface RegistrationData {
  label: string;
  count: number;
}

interface StudentRegistrationResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    timePeriod: 'day' | 'week' | 'month' | 'year';
    data: RegistrationData[];
  }
}

// Student response and data

interface StudentData {
  studentId: string;
  studentName: {
    fullName: string;
    profilePicture?: string;
  };
  accountHolder: string;
  ongoingLessons: number;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface PaginationInfo {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface StudentQueryParams {
  sortBy?: string;
  sortDescending?: boolean;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  accountType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface TutorQueryParams {
  sortBy?: string;
  sortDescending?: boolean;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  accountType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  minStudents?: number;
  maxStudents?: number;
}

export interface StudentsResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    students: StudentData[];
    pagination: PaginationInfo;
  };
}

// Tutor response

export interface Tutor {
  id: string;
  profilePicture: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  numberOfStudents: number;
  status: string;
}

interface TutorsData {
  tutors: Tutor[];
  pagination: PaginationInfo;
}

interface TutorResponse {
  statusCode: number;
  statusMessage: string;
  data: TutorsData;
}

interface TutorDetailsResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    totalLessonsConducted: number;
    totalActiveStudents: number;
    approvedSessionsToTeach: number;
    averageRating: number;
  }
}

interface NumberOfLessonData {
  date: string;
  dayOfWeek: string;
  bookingCount: number;
}

interface NumberOfLessonResponse {
  statusCode: number;
  statusMessage: string;
  data: NumberOfLessonData[];
}

// interface TutorsSchedule {
//   id: string;
//   date: string;
//   startHour: number;
//   endHour: number;
//   recurrenceType: string;
//   repeatCount: number;
// }

// interface TutorsScheduleResponse {
//   statusCode: number;
//   statusMessage: string;
//   data: TutorsSchedule[];
// }

interface TutorScheduleResponse {
  statusCode: number;
  statusMessage: string;
  data: Array<{
    id: string;
    date: string;
    startHour: number;
    endHour: number;
    recurrenceType: string;
    repeatCount: number;
  }>;
};

interface TutorProfileResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    profile: {
      profilePicture: string;
      fullName: string;
      profileCompletionPercentage: number;
      phoneNumber: string;
      dateOfBirth: string;
      emailAddress: string;
      location: string;
      gender: string;
      ongoingLessons: number;
    };
    about: {
      fullName: string;
      phoneNumber: string;
      emailAddress: string;
      dateOfBirth: string;
      nationality: string;
      gender: string;
      description: string;
    };
    documents: {
      nationalId: {
        id: string;
        url: string;
        status: string;
      };
      cpp: {
        id: string;
        url: string;
        status: string;
      }
      passportPhoto: {
        id: string;
        url: string;
        status: string;
      };
      kraPin: {
        id: string;
        url: string;
        status: string;
      };
      goodConduct: {
        id: string;
        url: string;
        status: string;
      };
    };
    sessions: [
        {
          id: string;
          thumbnailImage: string;
          title: string;
          about: string;
          totalRatings: number;
          approvalStatus: string;
      }
    ];
  };
}

interface StudentProfileResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    parentAccount: {
      profilePicture: string;
      fullName: string;
      profileCompletionPercentage: number;
      phoneNumber: string;
      emailAddress: string;
      gender: string;
      ongoingLessons: number;
    };
    childAccounts: {
      profilePicture: string;
      fullName: string;
      phoneNumber: string;
      emailAddress: string;
      dateOfBirth: string;
      gender: string;
    }[];
  };
};

// Admin Response
interface AdminResponse {
  statusCode: number;
  statusMessage: string;
  data: [
    {
      id: number,
      fullName: string,
      profilePicture: string,
      email: string,
      status: string
    }
  ]
}



export type { DashboardResponse, ActiveUserResponse, UserData, RegistrationData, StudentRegistrationResponse, TutorResponse, SidebarResponse, TutorDetailsResponse, NumberOfLessonResponse, TutorScheduleResponse, TutorProfileResponse, StudentProfileResponse, StudentData, AdminResponse };