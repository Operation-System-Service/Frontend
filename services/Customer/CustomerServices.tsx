import { CreateCustomerAddressInterface, CreateCustomerGroupInterface, CustomerAddressInterface, CustomerCreateInterface, CustomerGroupInterface, CustomerInterface } from "@/interfaces/ICustomer";
import axios from "axios";

export async function ListCustomers() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function DeleteCustomerById(id: string) {
    const reqOpt = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export async function GetCustomerByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}

export async function GetSearchCustomer(searchValue: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/search/${searchValue}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}


export async function CreateCustomer(customer: Partial<CustomerCreateInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/create`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}

export async function UpdateCustomer(customer: Partial<CustomerInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/update`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}

export async function ListCustomerAddresses() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/address/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function DeleteCustomerAddressById(id: number) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/address/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export async function GetCustomerAddressByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/address/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}
export async function GetCustomerAddressCustomerByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/address/customer/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}


export async function CreateCustomerAddress(customer: Partial<CreateCustomerAddressInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/address/create`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}

export async function UpdateCustomerAddress(customer: Partial<CustomerAddressInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/address/update`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}
export async function ListCustomerGroups() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/group/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function DeleteCustomerGroupById(id: string) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/group/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export async function GetCustomerGroupByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/group/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}
export async function GetCustomerGroupCustomerByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/group/customer/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}


export async function CreateCustomerGroup(customer: Partial<CreateCustomerGroupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/group/create`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}

export async function UpdateCustomerGroup(customer: Partial<CustomerGroupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/group/update`, customer, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
}