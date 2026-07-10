export interface MonthlyAttendanceReport {
    employeeId: string;
    month: number;
    year: number;
    totalWorkingDays: number;
    presentDays: number;
    absentDays: number;
    totalWorkingHours: number;
    overtimeHours: number;
}