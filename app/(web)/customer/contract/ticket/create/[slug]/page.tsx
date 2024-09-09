"use client"

import Layout from "@/app/(web)/layout"
import { ContractInterface } from "@/interfaces/IContract"
import { CreateOperationServiceInterface } from "@/interfaces/IOperationService"
import { PriorityInterface } from "@/interfaces/IPriority"
import { ServiceCatalogInterface } from "@/interfaces/IServiceCatalog"
import { SlaInterface } from "@/interfaces/ISla"
import { StatusInterface } from "@/interfaces/IStatus"
import { getContractByID } from "@/services/Contract/ContractServices"
import { CreateOperationService, ListOperationTypes } from "@/services/Operation/OperationServices"
import { ListPriorities } from "@/services/Priority/PriorityServices"
import { useRouter } from 'next/navigation'

import { ListStatus } from "@/services/Status/StatusServices"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import React from "react"
import { Container, Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, Select, SelectChangeEvent, Grid } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { ListDevisions } from "@/services/Devision/DevisionService"
import { ListEmployeeByDivision, ListEmployees } from "@/services/Employee/EmployeeServices"
import { DivisionInterface } from "@/interfaces/IDivision"

import { EmployeeInterface } from "@/interfaces/IEmployee"
import { CustomerAddressInterface } from "@/interfaces/ICustomer"
import { GetCustomerAddressCustomerByID } from "@/services/Customer/CustomerServices"
import { OperationTypeInterface } from "@/interfaces/IOperationType"
export default function OperationTicket({ params: { slug } }: { params: { slug: string } }) {
    let router = useRouter()
    const [operationType, setOperationType] = React.useState<ServiceCatalogInterface[]>([])
    const [status, setStatus] = React.useState<StatusInterface[]>([])
    const [priority, setPriority] = React.useState<PriorityInterface[]>([])
    const [divisions, setDivisions] = React.useState<DivisionInterface[]>([])
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
    const [division, setDivision] = React.useState<number>(0)
    const [contract, setContract] = React.useState<Partial<ContractInterface>>({
        Cost: 0.0,
        ServiceCatalogID: 0,
        SlaID: 0,
        CustomerID: ""
    })
    const [operation, setOperation] = React.useState<Partial<CreateOperationServiceInterface>>({
        StatusID: 0,
        PriorityID: 0,
        OperationTypeID: 0,
    })
    const [dateOfVisit, setDateOfVisit] = React.useState<Dayjs>(dayjs())
    const getContract = async (id: string | undefined) => {
        let res = await getContractByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setContract(res)
            getCustomerAddress(res.CustomerID)
        }
    }
    const [customerAddress, setCustomerAddress] = React.useState<CustomerAddressInterface[]>([]);
    const getCustomerAddress = async (id: string) => {
        try {
            const res = await GetCustomerAddressCustomerByID(id);
            if (res && res.Status !== "error") {
                setCustomerAddress(res)
            } else {
                console.log(res)
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดดึงข้อมูล Customer Address");
                setError(true);
            }
        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Address");
            setError(true);
        }
    }

    const getEmployee = async () => {
        let res = await ListEmployees();
        if (res && res.Status !== "error") {
            console.log(res)
            setEmployee(res)
        }
    }

    const getPriority = async () => {
        let res = await ListPriorities();
        console.log(res);
        if (res) {
            setPriority(res);
        }
    }

    const getDivision = async () => {
        let res = await ListDevisions();
        console.log(res);
        if (res) {
            setDivisions(res);
        }
    }

    const getOperationType = async () => {
        let res = await ListOperationTypes();
        console.log(res);
        if (res) {
            setOperationType(res);
        }
    }

    const getStatus = async () => {
        let res = await ListStatus();
        console.log(res);
        if (res) {
            setStatus(res);
        }
    }
    const getEmployeeByDivision = async (id: number) => {
        if (division == 0) {
            getEmployee()
        } else {
            let res = await ListEmployeeByDivision(id);
            console.log(res);
            if (res) {
                setEmployee(res);
            }

        }

    }

    React.useEffect(() => {
        getContract(slug);
        getPriority();
        getOperationType();
        getStatus();
        getDivision();
    }, []);
    React.useEffect(() => {
        getEmployeeByDivision(division)
    }, [division]);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const submit = async () => {
        console.log(operation)
        try {
            operation.DateOfVisit = dateOfVisit.format("YYYY-MM-DD").toString()
            operation.ContractID = slug

            operation.StatusID = convertType(operation.StatusID)
            operation.OperationTypeID = convertType(operation.OperationTypeID)
            operation.PriorityID = convertType(operation.PriorityID)

            let res = await CreateOperationService(operation)
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }

            // setTimeout(() => {
            //     router.push("/customer/contract/ticket")
            // }, 3000)


        } catch (error) {
            console.error("Error submitting contract data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }
    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof OperationTicket;

        const { value } = event.target;

        setOperation({ ...operation, [id]: value });
    };



    const handleInputChangeDivision = (event: SelectChangeEvent<number>) => {
        setDivision(Number(event.target.value)); // Ensure value is converted to a number
    };


    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof operation;
        setOperation({
            ...operation,
            [name]: event.target.value,
        });
    };

    const handleChangeString = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof operation;
        setOperation({
            ...operation,
            [name]: event.target.value,
        });
    };

    const handleChangeSiteName = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        // Find the selected site by name
        const selectedSite = customerAddress.find((site) => site.SiteName === value);
        if (selectedSite) {
            // Update the fields with the selected site's data
            setOperation((prevOperation) => ({
                ...prevOperation,
                OperationSiteName: selectedSite.SiteName,
                OperationSiteAddress: selectedSite.Address,
                ContactPerson: selectedSite.ContactPerson,
                ContactLineID: selectedSite.ContactLineID,
                ContactNumber: selectedSite.ContactNumber,
                ContactEmail: selectedSite.ContactEmail,
                OperationSiteGoogleMap: selectedSite.GoogleMapURL
            }));
        }
    };

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof operation;

        setOperation({
            ...operation,
            [name]: event.target.value
        })
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,

        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

    let theme = createTheme({ // button theme
        palette: {
            primary: {
                main: "#0082EF",
            },
            secondary: {
                main: "#0082EF"
            },
            text: {
                primary: "#000000",
                secondary: "#000000"
            }
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout>
                <ThemeProvider theme={theme}>
                    <div
                        className="flex flex-row justify-between w-full"
                        style={{ backgroundColor: "#f8f9fa" }}
                    >
                        <CardHeader
                            sx={{
                                "& .MuiCardHeader-title": {
                                    color: "#161616",
                                    fontSize: "32px",
                                    lineHeight: "48px",
                                },
                            }}
                            className="font-bold"
                            title={`Create Ticket`}
                        ></CardHeader>
                    </div>
                    <Container maxWidth="lg">
                        <Snackbar
                            id="success"
                            open={success}
                            autoHideDuration={4000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="success">
                                บันทึกข้อมูลสำเร็จ
                            </Alert>
                        </Snackbar>

                        <Snackbar
                            id="error"
                            open={error}
                            autoHideDuration={4000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="error">
                                {message}
                            </Alert>
                        </Snackbar>

                        <div className="w-full">
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Subject</p>

                                        <TextField
                                            id="OperationSubject"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={operation.OperationSubject || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>ScopeOfWorkURL</p>

                                        <TextField
                                            id="ScopeOfWorkURL"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={operation.ScopeOfWorkURL || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>SiteName</p>

                                        <Select
                                            native
                                            value={operation.OperationSiteName}
                                            onChange={handleChangeSiteName}
                                            inputProps={{
                                                name: "OperationSiteName",
                                            }}
                                            style={{ color: "black" }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ site name
                                            </option>
                                            {customerAddress.map((item: CustomerAddressInterface) => (
                                                <option value={item.SiteName} key={item.Id}>
                                                    {item.SiteName}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Map URL</p>

                                        <TextField
                                            disabled
                                            id="OperationSiteGoogleMap"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={operation.OperationSiteGoogleMap || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            InputProps={{
                                                style: {
                                                    backgroundColor: "#e8e8e8", // Dark background color
                                                    color: "#000000", // Light text color
                                                },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={10}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Address</p>

                                        <TextField
                                            disabled
                                            id="OperationSiteAddress"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={operation.OperationSiteAddress || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            InputProps={{
                                                style: {
                                                    backgroundColor: "#e8e8e8", // Dark background color
                                                    color: "#000000", // Light text color
                                                },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>ContactPerson</p>

                                        <TextField
                                            id="ContactPerson"
                                            variant="outlined"
                                            size="medium"
                                            value={operation.ContactPerson || ""}
                                            onChange={handleInputChange}

                                            style={{ color: "black" }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>LineID</p>

                                        <TextField
                                            id="ContactLineID"
                                            variant="outlined"
                                            size="medium"
                                            value={operation.ContactLineID || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Phone</p>
                                        <TextField
                                            id="ContactNumber"
                                            variant="outlined"
                                            size="medium"
                                            value={operation.ContactNumber || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Email</p>

                                        <TextField
                                            id="ContactEmail"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={operation.ContactEmail || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>


                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Date Of Visit</p>

                                        <DatePicker
                                            value={dateOfVisit}
                                            views={["day", "month", "year"]}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setDateOfVisit(newValue)
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Priority</p>
                                        <Select
                                            native
                                            value={operation.PriorityID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "PriorityID",
                                            }}
                                            style={{ color: "black" }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ priority
                                            </option>
                                            {priority.map((item: PriorityInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Status</p>
                                        <Select
                                            native
                                            value={operation.StatusID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "StatusID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ status
                                            </option>
                                            {status.map((item: StatusInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>OperationType</p>
                                        <Select
                                            native
                                            value={operation.OperationTypeID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "OperationTypeID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ OperationType
                                            </option>
                                            {operationType.map((item: OperationTypeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Division</p>
                                        <Select
                                            native
                                            value={division ?? 1}
                                            onChange={handleInputChangeDivision}
                                        // inputProps={{
                                        //     name: "StatusID",
                                        // }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ division
                                            </option>
                                            {divisions.map((item: DivisionInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Junior Employee</p>
                                        <Select
                                            native
                                            value={operation.JuniorEmployeeResponsibleID}
                                            onChange={handleChangeString}
                                            inputProps={{
                                                name: "JuniorEmployeeResponsibleID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ Junior Employee
                                            </option>
                                            {employee.map((item: EmployeeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Email}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Senior Employee</p>
                                        <Select
                                            native
                                            value={operation.SeniorEmployeeResponsibleID}
                                            onChange={handleChangeString}
                                            inputProps={{
                                                name: "SeniorEmployeeResponsibleID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ Senior Employee
                                            </option>
                                            {employee.map((item: EmployeeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Email}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Supervisor Employee</p>
                                        <Select
                                            native
                                            value={operation.SupervisorEmployeeResponsibleID}
                                            onChange={handleChangeString}
                                            inputProps={{
                                                name: "SupervisorEmployeeResponsibleID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ Supervisor Employee
                                            </option>
                                            {employee.map((item: EmployeeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Email}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={10}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Description</p>
                                        <OutlinedInput
                                            id="Description"
                                            type="string"
                                            size="medium"
                                            value={operation.Description || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            rows={4}
                                            multiline
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>



                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={4}>
                                    <a href={"/customer/contract"}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                "&.MuiButton-root": {
                                                    backgroundColor: "#0082EF",
                                                },
                                            }}
                                        >
                                            Back
                                        </Button>
                                    </a>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        style={{ float: "right" }}
                                        onClick={submit}
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            "&.MuiButton-root": {
                                                backgroundColor: "#0082EF",
                                            },
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </ThemeProvider>
            </Layout>
        </LocalizationProvider>
    );


}