export interface UserAssessmentReport{
    data:UserAssessmentReportData;
    type: string;
}

export interface UserAssessmentReportData{
    Agreeableness: number;
    Drive : number;
    Luck : number;
    Openess: number;
}

