import { EmployeeCreateInterface, EmployeeInterface, EmployeeUpdateInterface } from "@/interfaces/IEmployee";
import axios from "axios";

export async function ListEmployees() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/employee/list`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data.Data
        } else{
            return false
        }
    })
    return res
}

export async function DeleteEmployeeById(id: string) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/employee/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export async function CreateEmployee(employee: Partial<EmployeeCreateInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/employee/create`, employee, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating employee:", error);
        return false;
    }
}

export async function getEmployeeByEmail(email: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/employee/${email}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }
}
export async function ListEmployeeByDivision(id: number | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/employee/division/list/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }
}
export async function UpdateEmployee(employee: Partial<EmployeeUpdateInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/employee/update`, employee, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating employee:", error);
        return false;
    }
}