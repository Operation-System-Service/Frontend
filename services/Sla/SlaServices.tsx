import axios from "axios";

export async function ListSlas() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/sla/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListSlaTypes() {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/sla/type/list`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function ListSlasByType(id:number) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/sla/type/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}
export async function GetSlaTypeBySla(id:number) {
    const reqOpt = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("at")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await axios.get(`/api/sla/type/sla/${id}`, reqOpt)
        .then((res) => {
            if (res.data) {
                return res.data.Data
            } else {
                return false
            }
        })
    return res
}