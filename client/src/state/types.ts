export interface ExpensesByCategory {
    salaries : number;
    services : number;
    supplies : number;
}

export interface month {
    id : string;
    month : string;
    revenue : number;
    expenses : number;
    operationalExpenses : number;
    nonOperationalExpenses : number;
}

export interface day {
    id : string;
    month : string;
    revenue : number;
    expenses : number;
}

export interface GetKpiResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<month>
    dailyData: Array<day>;
}