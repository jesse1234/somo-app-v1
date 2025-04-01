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
}

interface StudentResponse {
  statusCode: number;
  statusMessage: string;
  data: StudentData[];
}

// Tutor response

interface TutorResponse {
  statusCode: number;
  statusMessage: string;
  data: [
      {
        id: string;
        profilePicture: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        numberOfStudents: number;
    }
]
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
      nationalId: string;
      birthCertificate: string;
      kraPin: string;
      goodConduct: string;
    };
    sessions: [
        {
          thumbnailImage: string,
          title: string,
          about: string,
          totalRatings: number
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

export type { DashboardResponse, ActiveUserResponse, UserData, RegistrationData, StudentRegistrationResponse, TutorResponse, StudentResponse, SidebarResponse, TutorDetailsResponse, NumberOfLessonResponse, TutorScheduleResponse, TutorProfileResponse, StudentProfileResponse, StudentData };