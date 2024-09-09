"use client"
import { Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, SelectChangeEvent, Select } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'


import { UpdateCustomer } from '@/services/Customer/CustomerServices'
import { useRouter } from 'next/navigation'
import Layout from '@/app/(web)/layout'
import { getEmployeeByEmail, ListEmployees, UpdateEmployee } from '@/services/Employee/EmployeeServices'
import { EmployeeInterface, EmployeeUpdateInterface } from '@/interfaces/IEmployee'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ListDevisions } from '@/services/Devision/DevisionService'
import { ListRoles, ListRolesByDivisionId } from '@/services/Role/RoleServices'
import { RoleInterface } from '@/interfaces/IRole'
import { DivisionInterface } from '@/interfaces/IDivision'

export default function EmployeeUpdate({ params: { slug } }: { params: { slug: string } }) {

    let router = useRouter()
    // List all Database
    // Get Employee by email
    const [employee, setEmployee] = React.useState<Partial<EmployeeUpdateInterface>>({
        DivisionID: 0,
    })
    const [devision, setDevision] = React.useState<DivisionInterface[]>([]);
    const [supervisor, setSupervisor] = React.useState<EmployeeInterface[]>([]);
    const [role, setRole] = React.useState<RoleInterface[]>([])
    const [probationDate, setProbationDate] = React.useState<Dayjs>(dayjs())
    const [startDate, setStartDate] = React.useState<Dayjs>(dayjs())
    const [terminateDate, setTerminateDate] = React.useState<Dayjs>(dayjs())
    const getEmployee = async (email: string | undefined) => {
        let res = await getEmployeeByEmail(email)
        if (res && res.Status !== "error") {
            console.log(res)
            setEmployee(res)
            console.log("employee")
            console.log(employee)
            // getRoleByDivisionId(res.DivisionID)
        }
        if (res.ProbationDate && res.ProbationDate !== "") {
            setProbationDate(dayjs(res.ProbationDate.substring(0, 10)));
        }
        if (res.StartDate && res.StartDate !== "") {
            setStartDate(dayjs(res.StartDate.substring(0, 10)))
        }
        if (res.TerminationDate && res.TerminationDate !== "") {
            setTerminateDate(dayjs(res.TerminationDate.substring(0, 10)))
        }


    }

    const getSupervisor = async () => {

        let res = await ListEmployees();
        console.log(res);
        if (res) {
            setSupervisor(res);
        }
    }
    // // get Role
    const getRoleByDivisionId = async (id: number) => {
        let res = await ListRolesByDivisionId(id);
        console.log(res);
        if (res) {
            setRole(res);
        }
    }
    // get Department
    const getDevision = async () => {
        //let id =0;
        let res = await ListDevisions();
        console.log(res);
        if (res) {
            setDevision(res);
        }
    }

    React.useEffect(() => {
        console.log("slug");
        console.log(slug);
        getEmployee(slug);
        getSupervisor();
        getDevision();
    }, []);
    React.useEffect(() => {
        getRoleByDivisionId(employee.DivisionID!);
    }, [employee.DivisionID]);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        employee.ProbationDate = probationDate.format("YYYY-MM-DD").toString()
        employee.StartDate = startDate.format("YYYY-MM-DD").toString()
        employee.TerminationDate = terminateDate.format("YYYY-MM-DD").toString()
        employee.DivisionID = convertType(employee.DivisionID)
        employee.RoleID = convertType(employee.RoleID)
        console.log(employee)
        try {
            let res = await UpdateEmployee(employee)
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }

            setTimeout(() => {
                router.push("/employee")
            }, 3000)


        } catch (error) {
            console.error("Error submitting customer data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }


    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EmployeeUpdate;

        const { value } = event.target;

        setEmployee({ ...employee, [id]: value });
    };

    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof employee;
        setEmployee({
            ...employee,
            [name]: event.target.value,
        });
    };
    const handleChangeString = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof employee;
        setEmployee({
            ...employee,
            [name]: event.target.value,
        });
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
                            title="Create Employee Management"
                        ></CardHeader>
                    </div>

                    <Container maxWidth="lg" >
                        <Snackbar
                            id="success"
                            open={success}
                            autoHideDuration={8000}
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
                            autoHideDuration={8000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="error">
                                {/* บันทึกข้อมูลไม่สำเร็จ */}
                                {message}
                            </Alert>
                        </Snackbar>
                        <div style={{ height: `calc(130vh - 300px)`, width: "100%", marginTop: "10px" }}>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Name</p>

                                        <TextField
                                            id="Name"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Name || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}

                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Phone</p>
                                        <TextField
                                            id="Phone"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Phone || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>LineID</p>

                                        <TextField
                                            id="LineID"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.LineID || ""}
                                            onChange={handleInputChange}

                                            style={{ color: "black" }}
                                            inputProps={{ maxLength: 10 }}

                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Email</p>
                                        <TextField
                                            id="Email"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={employee.Email || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">

                                        <p style={{ color: "black" }}>StartDate</p>
                                        <DatePicker
                                            views={["day", "month", "year"]}
                                            value={startDate}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setStartDate(newValue)
                                                }
                                            }}
                                            format="DDMMYYYY"
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>ProbationDate</p>
                                        <DatePicker
                                            views={["day", "month", "year"]}
                                            value={probationDate}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setProbationDate(newValue)
                                                }
                                            }}
                                            format="DDMMYYYY"
                                        />

                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>TerminationDate</p>
                                        <DatePicker
                                            value={terminateDate}
                                            views={["day", "month", "year"]}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setTerminateDate(newValue)
                                                }
                                            }}
                                            format="DDMMYYYY"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Role</p>
                                        <Select
                                            native
                                            value={employee.RoleID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "RoleID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ role
                                            </option>
                                            {role.map((item: RoleInterface) => (
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
                                            value={employee.DivisionID}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "DivisionID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกแผนก
                                            </option>
                                            {devision.map((item: DivisionInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Supervisor</p>
                                        <Select
                                            native
                                            value={employee.SupervisorID}
                                            onChange={handleChangeString}
                                            inputProps={{
                                                name: "SupervisorID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณาเลือก supervisor
                                            </option>
                                            {supervisor.map((item: EmployeeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={4}>
                                    <a href={"/employee"}>
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
                                        Update
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