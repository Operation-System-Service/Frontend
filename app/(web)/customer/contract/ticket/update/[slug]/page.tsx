"use client"

import Layout from "@/app/(web)/layout"
import { ContractCreateInterface, ContractInterface, ContractUpdateInterface } from "@/interfaces/IContract"
import { CustomerAddressInterface, CustomerInterface } from "@/interfaces/ICustomer"
import { CreateOperationServiceInterface, ListOperationServiceHistoryInterface, UpdateOperationServiceInterface } from "@/interfaces/IOperationService"
import { PriorityInterface } from "@/interfaces/IPriority"
import { ServiceCatalogInterface } from "@/interfaces/IServiceCatalog"
import { SlaInterface } from "@/interfaces/ISla"
import { StatusInterface } from "@/interfaces/IStatus"
import { getContractByID } from "@/services/Contract/ContractServices"
import { CreateOperationService, GetOperationServiceById, GetOperationServiceHistoryByOperationId, ListOperationTypes, UpdateOperationService } from "@/services/Operation/OperationServices"
import { ListPriorities } from "@/services/Priority/PriorityServices"

import { ListServiceCatalogs } from "@/services/ServiceCatalog/ServiceCatalogServices"
import { ListSlas } from "@/services/Sla/SlaServices"
import { ListStatus } from "@/services/Status/StatusServices"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import React from "react"
import { Container, Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, Select, SelectChangeEvent, Grid, Divider, TableCell, Link, TableRow, TableBody, Table, TableContainer, TableHead, IconButton, Tooltip, Box, Tab, List, ListItem, ListItemText } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { ListDevisions } from "@/services/Devision/DevisionService"
import { ListEmployeeByDivision, ListEmployees } from "@/services/Employee/EmployeeServices"
import { DivisionInterface } from "@/interfaces/IDivision"
import { OperationTypeInterface } from "@/interfaces/IOperationType"
import { EmployeeCreateInterface, EmployeeInterface } from "@/interfaces/IEmployee"
import { useRouter } from 'next/navigation'
import { GetCustomerAddressCustomerByID } from "@/services/Customer/CustomerServices"
import { ContentCopy } from "@mui/icons-material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
export default function UpdateOperationTicket({ params: { slug } }: { params: { slug: string } }) {
    let router = useRouter()
    const [operationType, setOperationType] = React.useState<ServiceCatalogInterface[]>([])
    const [status, setStatus] = React.useState<StatusInterface[]>([])
    const [priority, setPriority] = React.useState<PriorityInterface[]>([])
    const [divisions, setDivisions] = React.useState<DivisionInterface[]>([])
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
    const [operationHistory, setOperationHistory] = React.useState<ListOperationServiceHistoryInterface[]>([])
    const [division, setDivision] = React.useState<number>(0)
    const [operation, setOperation] = React.useState<Partial<UpdateOperationServiceInterface>>({
        StatusID: 0,
        PriorityID: 0,
        OperationTypeID: 0,
    })
    const [contract, setContract] = React.useState<Partial<ContractUpdateInterface>>({
        Cost: 0.0,
        ServiceCatalogID: 0,
        SlaID: 0
    })
    const getContract = async (id: string | undefined) => {
        let res = await getContractByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setContract(res)
            getCustomerAddress(res.CustomerID)
        }
    }
    const [dateOfVisit, setDateOfVisit] = React.useState<Dayjs>(dayjs())
    const getOperation = async (id: string) => {
        let res = await GetOperationServiceById(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setOperation(res)
            getContract(res.ContractID)
        }
    }
    const getOperationHistory = async (id: string) => {
        let res = await GetOperationServiceHistoryByOperationId(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setOperationHistory(res)
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



    React.useEffect(() => {
        getOperation(slug);
        getOperationHistory(slug);
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

            let res = await UpdateOperationService(operation)
            if (res && res.Status !== "error") {
                getOperationHistory(slug);
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
        const id = event.target.id as keyof typeof UpdateOperationTicket;

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
    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date);

        const day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        let h = newDate.getHours() - 7;
        const hours = h < 10 ? "0" + h : h;
        const minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
        const seconds = newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds();

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }

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


    const handleCopyClick = (url: string) => {
        if (url !== "-") {
            navigator.clipboard.writeText(url).then(
                (err) => {
                    console.error("Could not copy text: ", err);
                }
            );
        }
    };

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
    const [tabValue, setTabValue] = React.useState(1);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                <ThemeProvider theme={theme} >

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
                            title={`Ticker Number: ${operation.OperationNumber || ""}`}
                        ></CardHeader>
                    </div>
                    <div>
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

                        <div className="flex flex-col h-screen" style={{ background: "#f8f9fa" }}>
                            <TabContext value={String(tabValue)}>
                                <Box >
                                    <TabList sx={{ padding: 0, margin: 0 }} onChange={handleChangeTab} aria-label="lab API tabs example" >
                                        <Tab label="Case detail" value="1" />
                                        <Tab label="Comment" value="2" />
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                                    InputProps={{
                                                        endAdornment: operation?.ScopeOfWorkURL ? (
                                                            <Tooltip title="Copy URL">
                                                                <IconButton
                                                                    onClick={() => handleCopyClick(operation?.ScopeOfWorkURL!)}
                                                                    size="small"
                                                                    style={{ marginLeft: 8 }}
                                                                >
                                                                    <ContentCopy style={{ color: "#0000EE" }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        ) : null,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
                                            <FormControl fullWidth variant="outlined">
                                                <p style={{ color: "black" }}>Status</p>
                                                <Select
                                                    native
                                                    value={operation.StatusID ?? 1}
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
                                    </Grid>
                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                    </Grid>
                                    <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                                        endAdornment: operation?.ScopeOfWorkURL ? (
                                                            <Tooltip title="Copy URL">
                                                                <IconButton
                                                                    onClick={() => handleCopyClick(operation?.ScopeOfWorkURL!)}
                                                                    size="small"
                                                                    style={{ marginLeft: 8 }}
                                                                >
                                                                    <ContentCopy style={{ color: "#0000EE" }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        ) : null,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={13}>
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

                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth variant="outlined">
                                                <p style={{ color: "black" }}>Division</p>
                                                <Select
                                                    native
                                                    value={division ?? 1}
                                                    onChange={handleInputChangeDivision}
                                                    inputProps={{
                                                        name: "DivisionID",
                                                    }}
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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

                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={13}>
                                            <FormControl fullWidth variant="outlined">
                                                <p style={{ color: "black" }}>Description</p>
                                                <OutlinedInput
                                                    id="Description"
                                                    type="string"
                                                    size="medium"
                                                    value={operation.Description || ""}
                                                    onChange={handleInputChange}
                                                    style={{ color: "black" }}
                                                    rows={5}
                                                    multiline
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "0%" }}>
                                        <Grid item xs={4}>
                                            <a href={"/customer/contract/ticket"}>
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
                                        <Grid item xs={8}>
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
                                                Update
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </TabPanel>
                                <TabPanel value="2">
                                    <Box
                                        sx={{
                                            maxHeight: '600px',
                                            minHeight: '600px',
                                            overflowY: 'auto',
                                            padding: 2,
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <List>
                                            {operationHistory.map((op, index) => (
                                                <ListItem
                                                    key={index}
                                                    sx={{
                                                        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                                    }}
                                                >
                                                    <ListItemText
                                                        sx={{
                                                            backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#e0f7fa',
                                                            borderRadius: '10px',
                                                            padding: 1,
                                                            maxWidth: '60%',
                                                            maxHeight: '50%',
                                                            color: "black"


                                                        }}

                                                        primary={op.Description}
                                                        secondary={`Comment By: ${employee.find((emp) => emp.Id == op.EmployeeUpdatedID)?.Email || " - "} | ${convertDateFormat(op.UpdateDate!) || " - "} น`}

                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>

                                </TabPanel>
                            </TabContext>


                            <Divider sx={{ borderColor: "border-gray-600" }} />

                            <div style={{ height: `calc(150vh - 300px)`, width: "100%", marginTop: "10px", backgroundColor: "#f8f9fa" }}>
                                <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell align="center" width="10%"> SiteName </TableCell>
                                                <TableCell align="center" width="10%"> GoogleMap </TableCell>
                                                <TableCell align="center" width="5%"> Priority </TableCell>
                                                <TableCell align="center" width="5%"> Status </TableCell>
                                                <TableCell align="center" width="5%"> Update By </TableCell>
                                                <TableCell align="center" width="10%"> Update Date </TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody >
                                            {operationHistory.map((item: ListOperationServiceHistoryInterface) => (
                                                <TableRow
                                                    key={item.Id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{item.OperationSiteName}</TableCell>
                                                    <TableCell align="center">{item.OperationSiteGoogleMap || "-"}</TableCell>
                                                    <TableCell align="center">{priority.find((p) => p.Id == item.PriorityID)?.Name || "-"}</TableCell>
                                                    <TableCell align="center">{status.find((st) => st.Id == item.StatusID)?.Name || "-"}</TableCell>
                                                    <TableCell align="center">{employee.find((emp) => emp.Id == item.EmployeeUpdatedID)?.Email || "-"}</TableCell>
                                                    <TableCell align="center">{convertDateFormat(item.UpdateDate!)}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                        </div>
                    </div>
                    {/* </Container> */}
                </ThemeProvider>
            </Layout>
        </LocalizationProvider>
    );


}