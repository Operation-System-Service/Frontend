"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../layout";
import { EmployeeInterface } from "@/interfaces/IEmployee";

import React from "react";
import { DeleteEmployeeById, ListEmployees } from "@/services/Employee/EmployeeServices";
import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";
import { BrowserRouter as Router } from 'react-router-dom';


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        backgroundColor: "#f8f9fa",
        height: "100vh"
    },
});


const Employee = ({ children }: any) => {
    // const history = useHistory();
    const { settings, saveSettings } = useSettings()
    let theme = createTheme(themeOptions(settings, "dark"))
    //Employee State
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
    const getEmployee = async () => {
        let res = await ListEmployees();
        if (res) {
            setEmployee(res)
            //debug
            console.log(res)
        }
    }
    React.useEffect(() => {
        getEmployee();
        console.log(employee)

    }, [])
    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteEmployeeById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getEmployee();
        setOpenDelete(false)

    }


    const handleDialogDeleteOpen = (ID: string) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID("")
        }, 500)
    }

    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate() < 10 ? "0"+newDate.getDate():newDate.getDate()}/${newDate.getMonth()+1 < 10 ? "0"+(newDate.getMonth()+1): newDate.getMonth()+1}/${newDate.getFullYear() < 10 ? "000"+newDate.getFullYear(): newDate.getFullYear() < 100 ? "00"+newDate.getFullYear() : newDate.getFullYear()<1000 ? "0"+newDate.getFullYear() : newDate.getFullYear()}`
    }


    return (
        // <Router>
        <Layout>
            {/* <Container maxWidth="xl" style={{ backgroundColor: "#f8f9fa" }}> */}
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
                    title="HR Management"
                ></CardHeader>
            </div>
            <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, py: 2, flexGrow: 1 }}>
                <div>
                    <div style={{ marginTop: "10px" }}>
                        <Grid container spacing={1} >
                            <Grid item xs={3} className="flex justify-center flex-col-reverse">
                                <TextField
                                    style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderRadius: "10px 0px 0px 10px",
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px 0px 0px 10px",
                                        },
                                    }}
                                    size="small"
                                    label="Search Name, Email"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid className="flex justify-center flex-col-reverse" sx={{ paddingTop: "4px" }} xs={0.5}>
                                <Button
                                    variant="contained"
                                    //   onClick={handleSearch}
                                    style={{
                                        borderRadius: "0px 10px 10px 0px",
                                        height: "100%",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    sx={{
                                        "&.MuiButton-root": {
                                            backgroundColor: "#0082EF",
                                        },
                                    }}
                                >
                                    <SearchIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={7}>

                            </Grid>
                            <Grid
                                className="flex justify-center flex-col-reverse"
                                item
                                xs={1.5}
                                // sx={{ pr: 2 }}
                                style={{ alignItems: "end" }}
                            >

                                <Button
                                    variant="contained"
                                    href="/employee/create"
                                    style={{ borderRadius: "24px" }}
                                >
                                    + Create
                                </Button>
                            </Grid>

                        </Grid>
                    </div>

                    <Divider sx={{ borderColor: "transparent" }} />

                    <div style={{ height: `calc(150vh - 300px)`, width: "100%", marginTop: "10px" }}>
                        <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="12%"> Name </TableCell>
                                        <TableCell align="center" width="10%"> Email </TableCell>
                                        <TableCell align="center" width="5%"> LineID </TableCell>
                                        <TableCell align="center" width="10%"> Phone </TableCell>
                                        <TableCell align="center" width="5%"> Role </TableCell>
                                        <TableCell align="center" width="10%"> Division </TableCell>
                                        <TableCell align="center" width="12%"> Supervisor </TableCell>
                                        <TableCell align="center" width="10%"> StartDate </TableCell>
                                        <TableCell align="center" width="10%"> ProbationDate </TableCell>
                                        <TableCell align="center" width="5%"> Edit </TableCell>
                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {employee.map((item: EmployeeInterface) => (
                                        <TableRow
                                            key={item.Id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{item.Name}</TableCell>
                                            <TableCell align="center">{item.Email}</TableCell>
                                            <TableCell align="center">{item.LineID}</TableCell>
                                            <TableCell align="center">{item.Phone}</TableCell>
                                            <TableCell align="center">{item.Role?.Name}</TableCell>
                                            <TableCell align="center">{item.Division?.Name}</TableCell>
                                            <TableCell align="center">{item.Supervisor?.Name}</TableCell>
                                            <TableCell align="center">{convertDateFormat(item.StartDate)}</TableCell>
                                            <TableCell align="center">{convertDateFormat(item.ProbationDate)}</TableCell>
                                            <TableCell>
                                                {
                                                    <a href={"/employee/update/" + item.Email}>
                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 75, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </a>

                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {

                                                    <Button
                                                        variant='outlined'
                                                        color='error'
                                                        onClick={() => { handleDialogDeleteOpen(item.Id) }}
                                                        sx={{
                                                            maxWidth: 75, // Set the maximum width of the button
                                                            maxHeight: 60, // Set the maximum height of the button
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                }

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                        </Box>
                        <Dialog
                            open={openDelete}
                            onClose={handleDialogDeleteclose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{
                                style: {
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`คุณต้องการลบข้อมูลของพนักงาน ${employee.filter((emp) => (emp.Id === deleteID)).at(0)?.Name} จริงหรือไม่`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                                <Button onClick={handleDelete} className="bg-red" autoFocus>
                                    ยืนยัน
                                </Button>
                            </DialogActions>

                        </Dialog>
                    </div>

                </div>
            </CardContent>
            {/* </Container> */}

        </Layout>
    )

}

export default Employee;