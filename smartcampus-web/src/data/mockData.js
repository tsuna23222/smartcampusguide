export const mockStudent = {
  student_id: "2026-00142",
  name: "Alex Carlsoon",
  email: "alex.carlsoon@university.edu",
  course: "BS Computer Science",
  year_level: "1st Year",
};

export const mockSchedule = {
  Monday: [
    { subject_id: "CS101", subject_name: "Introduction to Programming", instructor: "Prof. Santos", time: "09:00 AM – 10:30 AM", room: "530", building: "Science & Tech Building", floor: "5th" },
    { subject_id: "MATH101", subject_name: "Calculus 1", instructor: "Prof. Reyes", time: "11:00 AM – 12:30 PM", room: "210", building: "Main Building", floor: "2nd" },
    { subject_id: "ENG101", subject_name: "Technical Writing", instructor: "Prof. Garcia", time: "01:00 PM – 02:30 PM", room: "305", building: "Liberal Arts Building", floor: "3rd" },
  ],
  Tuesday: [
    { subject_id: "PE101", subject_name: "Physical Education", instructor: "Coach Dela Cruz", time: "07:30 AM – 09:00 AM", room: "GYM", building: "Sports Complex", floor: "Ground" },
    { subject_id: "FIL101", subject_name: "Filipino 1", instructor: "Prof. Mendoza", time: "10:00 AM – 11:30 AM", room: "115", building: "Main Building", floor: "1st" },
  ],
  Wednesday: [
    { subject_id: "CS101", subject_name: "Introduction to Programming", instructor: "Prof. Santos", time: "09:00 AM – 10:30 AM", room: "530", building: "Science & Tech Building", floor: "5th" },
    { subject_id: "NSTP101", subject_name: "NSTP / CWTS", instructor: "Prof. Villanueva", time: "01:00 PM – 04:00 PM", room: "Auditorium", building: "Main Building", floor: "Ground" },
  ],
  Thursday: [
    { subject_id: "MATH101", subject_name: "Calculus 1", instructor: "Prof. Reyes", time: "11:00 AM – 12:30 PM", room: "210", building: "Main Building", floor: "2nd" },
    { subject_id: "ENG101", subject_name: "Technical Writing", instructor: "Prof. Garcia", time: "02:30 PM – 04:00 PM", room: "305", building: "Liberal Arts Building", floor: "3rd" },
  ],
  Friday: [
    { subject_id: "CS102", subject_name: "Computer Fundamentals", instructor: "Prof. Tan", time: "08:00 AM – 09:30 AM", room: "Lab 1", building: "Science & Tech Building", floor: "2nd" },
    { subject_id: "FIL101", subject_name: "Filipino 1", instructor: "Prof. Mendoza", time: "10:00 AM – 11:30 AM", room: "115", building: "Main Building", floor: "1st" },
  ],
};

export const mockNotifications = [
  { id: "N001", type: "urgent", title: "Room Change: CS 101", message: "Your CS 101 lecture today has been moved from Room 302 to the Main Auditorium. Please proceed immediately.", time: "10 mins ago", read: false },
  { id: "N002", type: "info", title: "Welcome Freshmen!", message: "Welcome to CampusGuide. Use the map to navigate your first week easily. Don't hesitate to ask the Student Affairs office for help.", time: "1 Day Ago", read: false },
  { id: "N003", type: "announcement", title: "Library Hours Extended", message: "The Main Library will now be open until midnight during the midterm examination period. Your student ID is required for entry.", time: "2 Days Ago", read: true },
  { id: "N004", type: "info", title: "Enrollment Reminder", message: "Please complete your enrollment requirements at the Registrar's Office before Friday to avoid late fees.", time: "3 Days Ago", read: true },
];

export const mockRooms = [
  { room_id: "R001", building: "Science & Tech Building", room_number: "530", floor: "5th", directions: "Enter from the main gate. Go to the Science & Tech Building (right side). Take the elevator or stairs to the 5th floor. Room 530 is on the left hallway." },
  { room_id: "R002", building: "Science & Tech Building", room_number: "Lab 1", floor: "2nd", directions: "Enter from the main gate. Go to the Science & Tech Building. Take the stairs to the 2nd floor. Computer Lab 1 is straight ahead." },
  { room_id: "R003", building: "Main Building", room_number: "210", floor: "2nd", directions: "Enter from the main entrance. Go to the Main Building (center). Take the stairs to the 2nd floor. Room 210 is along the right corridor." },
  { room_id: "R004", building: "Main Building", room_number: "115", floor: "1st", directions: "Enter from the main entrance. Room 115 is on the ground floor, left wing of the Main Building." },
  { room_id: "R005", building: "Main Building", room_number: "Auditorium", floor: "Ground", directions: "The Auditorium is at the back of the Main Building, ground floor. Follow the signage from the main lobby." },
  { room_id: "R006", building: "Liberal Arts Building", room_number: "305", floor: "3rd", directions: "Go to the Liberal Arts Building (left side of campus). Take the stairs to the 3rd floor. Room 305 is at the end of the hallway." },
  { room_id: "R007", building: "Sports Complex", room_number: "GYM", floor: "Ground", directions: "The Sports Complex is at the back of the campus. The main gymnasium is on the ground floor." },
];
