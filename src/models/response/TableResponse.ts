export default interface TableRecord {
    companySigDate: string, 
    companySignatureName: string, 
    documentName: string, 
    documentStatus: string, 
    documentType: string, 
    employeeNumber: string, 
    employeeSigDate: string, 
    employeeSignatureName: string 
    id: string
}

export default interface TableResponse {
        error_code: number,
        error_message: string,
        data: TableRecord[],
        profiling: string,
        timings: number
}
