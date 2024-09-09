import { DeviceConfigBackupInterface, ContractCreateInterface, ContractInterface, ContractUpdateInterface, CreateDeviceConfigBackupInterface, CreateDeviceInterface, CreateSoftwareInterface, DeviceInterface, CreateSoftwareConfigBackupInterface, SoftwareConfigBackupInterface } from "@/interfaces/IContract";
import axios from "axios";

export async function CreateContract(contract: Partial<ContractCreateInterface>) {
    try {

        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/create`, contract, reqOpt);

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
export async function CreateDevice(device: Partial<CreateDeviceInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/device/create`, device, reqOpt);

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
export async function CreateSoftware(sf: Partial<CreateSoftwareInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/software/create`, sf, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating software:", error);
        return false;
    }
}
export async function CreateDeviceConfigBackup(cf: Partial<CreateDeviceConfigBackupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/config/device/create`, cf, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating config backup:", error);
        return false;
    }
}
export async function UpdateDeviceConfigBackup(cf: Partial<DeviceConfigBackupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/config/device/update`, cf, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating config backup:", error);
        return false;
    }
}
export async function CreateSoftwareConfigBackup(cf: Partial<CreateSoftwareConfigBackupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(`/api/customer/contract/config/software/create`, cf, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating config backup:", error);
        return false;
    }
}
export async function UpdateSoftwareConfigBackup(cf: Partial<SoftwareConfigBackupInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/config/software/update`, cf, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating config backup:", error);
        return false;
    }
}
export async function UpdateDevice(device: Partial<CreateDeviceInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/device/update`, device, reqOpt);

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
export async function UpdateSoftware(device: Partial<CreateSoftwareInterface>) {
    try {
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/software/update`, device, reqOpt);

        if (res.data) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating software:", error);
        return false;
    }
}
export async function ListContracts() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListDeviceByContractId(id :string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/device/list/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListContractHistoryByContractId(id :string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/history/contract/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListDeviceConfigBackupByContractId(id :string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/config/device/list/contract/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListSoftwareConfigBackupByContractId(id :string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/config/software/list/contract/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function LisSoftwareByContractId(id :string) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/software/list/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}

export async function getContractByID(id: string | undefined) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/customer/contract/${id}`, reqOpt)
    if (res.data) {
        return res.data.Data
    } else {
        return false
    }

}

export async function UpdateContract(contract: Partial<ContractUpdateInterface>) {
    try {
    
        const reqOpt = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
                "Content-Type": "application/json",
            },
        };

        const res = await axios.patch(`/api/customer/contract/update`, contract, reqOpt);

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

export async function DeleteContractById(id: string) {
    const reqOpt = {
        method: "GET",
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

export async function DeleteDeviceById(id: string) {
    const reqOpt = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/contract/device/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}
export async function DeleteSoftwareById(id: string) {
    const reqOpt = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/contract/software/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}
export async function DeleteDeviceConfigBackupById(id: string) {
    const reqOpt = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/contract/config/device/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}
export async function DeleteSoftwareConfigBackupById(id: string) {
    const reqOpt = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.delete(`/api/customer/contract/config/software/delete/${id}`, reqOpt)
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}