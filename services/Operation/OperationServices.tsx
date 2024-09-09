
import { CreateOperationServiceInterface, UpdateOperationServiceInterface } from "@/interfaces/IOperationService";
import axios from "axios";

export async function ListOperationTypes() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operationtype/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function ListOperationServices() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function CreateOperationService(operation : Partial<CreateOperationServiceInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/operation/create `, operation, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating contract:", error);
        return false;
    }
}

export async function UpdateOperationService(contract: Partial<UpdateOperationServiceInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/operation/update`, contract, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating contract:", error);
        return false;
    }

}

export async function DeleteOperationServiceById(id: string) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/operation/delete/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data
            } else {
                return false
            }
        })
    return res
}

export async function GetOperationServiceById(id: string) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function GetOperationServiceByContractId(id: string) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/contract/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function GetOperationServiceByStatusId(id: Number) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/status/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function GetOperationServiceHistoryByOperationId(id: string) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/history/operation/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

