export interface UserAssessmentReport{
    data:UserAssessmentReportData;
    type: string;
}

export interface UserAssessmentReportData{
    agreeableness: number;
    drive : number;
    luck : number;
    openess: number;
}

