
import { CreateOperationServiceInterface, UpdateOperationServiceInterface } from "@/interfaces/IOperationService";
import axios, { AxiosRequestConfig } from "axios";

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
export async function GetSearchOperationService(searchValue: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/operation/search/${searchValue}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

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

export async function CreateOperationService(operation: Partial<CreateOperationServiceInterface>) {
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

export async function downloadCsv(search_key: string) {
    try {
        const reqOpt: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('at')}`,
                'Content-Type': 'application/json',
            },
            responseType: 'blob',
        };
        const response = await axios.post(
            '/api/operation/export/csv',
            { search_key: search_key }, // This is the data being sent with the request
            reqOpt
        );

        // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'operation_services.csv'); // The filename to use for the download
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after the download
        return "success"
    } catch (error) {
        console.error('Failed to download CSV:', error);
        return error
    }
};
export async function downloadPdf(search_key: string) {
    try {
        const reqOpt: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('at')}`,
                'Content-Type': 'application/json',
            },
            responseType: 'blob',
        };
        const response = await axios.post(
            '/api/operation/export/pdf',
            { search_key: search_key }, // This is the data being sent with the request
            reqOpt
        );

        // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'operation_services.pdf'); // The filename to use for the download
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after the download
        return "success"
    } catch (error) {
        console.error('Failed to download pdf:', error);
        return error
    }
};

