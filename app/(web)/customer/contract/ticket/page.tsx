"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, ThemeProvider, createTheme, Typography, FormControl, Select, SelectChangeEvent, InputLabel, OutlinedInput } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "@/app/(web)/layout";
import { CustomerInterface } from "@/interfaces/ICustomer";

import React from "react";

import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";
import { GetSearchCustomer } from "@/services/Customer/CustomerServices";
import Link from "next/link";

import { ContractInterface } from "@/interfaces/IContract";
import { ListContracts } from "@/services/Contract/ContractServices";
import { DeleteOperationServiceById, GetOperationServiceByStatusId, ListOperationServices } from "@/services/Operation/OperationServices";
import { ListOperationServiceInterface } from "@/interfaces/IOperationService";
import { StatusInterface } from "@/interfaces/IStatus";
import { ListStatus } from "@/services/Status/StatusServices";


const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: 1200,
    },
    drawer: {
        width: 120,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        background:
            "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
    },
    toolbar: {
        minHeight: 64,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#eaecef",
        // padding: 8,
    },
    texticon: {
        color: "#fff",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "24px"
    },
    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "17%",
    },
});


const Ticket = ({ children }: any) => {
    //Customer State
    const [operation, setOperation] = React.useState<ListOperationServiceInterface[]>([])
    const [overAllOperation, setOverAllOperation] = React.useState<ListOperationServiceInterface[]>([])
    const getOperation = async () => {
        let res = await ListOperationServices();
        if (res) {
            setOperation(res)
            setOverAllOperation(res)
        }
    }
    const getOperationByStatus = async (id : Number) => {
        let res = await GetOperationServiceByStatusId(id);
        if (res) {
            setOperation(res)
        }
    }
    React.useEffect(() => {
        getOperation();
        getStatus();
        // console.log(contract)

    }, [])
    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteOperationServiceById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getOperation();
        setOpenDelete(false)

    }
    const [searchValue, setSearchValue] = React.useState<string>("")
    const handleInputChange = (
        event: React.ChangeEvent<{ value: any }>
    ) => {

        const { value } = event.target;
        setSearchValue(value);
    };

    const handleSearch = async () => {
        if (searchValue == "") {
            getOperation()
        } else {
            let res = await GetSearchCustomer(searchValue)
            if (res) {
                console.log(res)
                setOperation(res);
            } else {
                console.log(res)
            }

        }

    }
    const getStatus = async () => {
        let res = await ListStatus();
        console.log(res);
        if (res) {
            setStatus(res);
        }
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

    const [status, setStatus] = React.useState<StatusInterface[]>([])
    const [selectStatus, setSelectStatus] = React.useState<number>(0)
    const handleChangeStatus = (event: SelectChangeEvent<number>) => {
        const value = Number(event.target.value); // Convert the value to a number
        setSelectStatus(value);
    
        if (value === 0) {
            getOperation();
        } else {
            getOperationByStatus(value);
        }
    };


    return (

        <Layout>

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
                    title="Ticket Management"
                ></CardHeader>
            </div>
            <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, py: 2, flexGrow: 1 }}>
                <div>
                    <div style={{ marginTop: "1px" }}>
                        <Grid container spacing={0} alignItems="center" >
                            {/* Search Field */}
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "10px 0px 0px 10px",
                                        minHeight: "60px",
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px 0px 0px 10px",
                                        },
                                    }}
                                    size="medium"
                                    label="Search Name, Email"
                                    variant="outlined"
                                    value={searchValue || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* Search Button */}
                            <Grid item xs={1} sx={{ paddingTop: "0px" }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    fullWidth
                                    style={{
                                        borderRadius: "0px 10px 10px 0px",
                                        height: "60px",
                                    }}
                                    sx={{
                                        backgroundColor: "#0082EF",
                                    }}
                                >
                                    <SearchIcon />
                                </Button>
                            </Grid>

                            {/* Status Dropdown */}
                            <Grid item xs={4} sx={{ paddingLeft: "20px" }}>
                                <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-multiple-name-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        native
                                        onChange={handleChangeStatus}
                                        value={selectStatus ?? 0}
                                        input={<OutlinedInput label="Status" />}
                                        inputProps={{
                                            name: "StatusID",
                                        }}
                                        style={{
                                            borderRadius: "0px 10px 10px 0px",
                                            height: "100%",
                                        }}

                                    >
                                        <option value={0} key={0}>
                                            All Status
                                        </option>
                                        {status.map((item: StatusInterface) => (
                                            <option key={item.Id} value={item.Id}>{item.Name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    <Divider sx={{ borderColor: "transparent", padding: 2 }} />
                    <div className="flex flex-row ">
                        <Box
                            sx={{
                                position: 'relative',
                                maxHeight: '150px',
                                minHeight: '150px',
                                flexGrow: 1,
                                overflowY: 'auto',
                                padding: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                marginRight: 3, // Add some space between boxes
                                background: "#EEEDEB"
                            }}
                        >
                            <Typography
                                variant="body2" // Small text size
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                }}
                            >
                                New Case
                            </Typography>

                            {/* Large centered text */}
                            <Typography
                                variant="h2" // Large text size
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#5B99C2', // Blue color
                                    fontSize: '7rem', // Make the text even larger
                                    fontWeight: '900', // Make the text extra bold
                                }}
                            >
                                {overAllOperation.filter(op => op.Status?.Name === 'Open').length}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                maxHeight: '150px',
                                minHeight: '150px',
                                flexGrow: 1,
                                overflowY: 'auto',
                                padding: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                marginRight: 3, // Add some space between boxes
                                background: "#EEEDEB"
                            }}
                        >
                            <Typography
                                variant="body2" // Small text size
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                }}
                            >
                                Open Case
                            </Typography>

                            {/* Large centered text */}
                            <Typography
                                variant="h2" // Large text size
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#E9C46A', // Blue color
                                    fontSize: '7rem', // Make the text even larger
                                    fontWeight: '900', // Make the text extra bold
                                }}
                            >
                                {overAllOperation.filter(op => op.Status?.Name === 'In-Progress').length + overAllOperation.filter(op => op.Status?.Name === 'Notice').length + operation.filter(op => op.Status?.Name === 'Pending').length}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                maxHeight: '150px',
                                minHeight: '150px',
                                flexGrow: 1,
                                overflowY: 'auto',
                                padding: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                marginRight: 1, // Add some space between boxes
                                background: "#EEEDEB"
                            }}
                        >
                            <Typography
                                variant="body2" // Small text size
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                }}
                            >
                                Close Case
                            </Typography>

                            {/* Large centered text */}
                            <Typography
                                variant="h2" // Large text size
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#379777', // Blue color
                                    fontSize: '7rem', // Make the text even larger
                                    fontWeight: '900', // Make the text extra bold
                                }}
                            >
                                {overAllOperation.filter(op => op.Status?.Name === 'Complete').length + overAllOperation.filter(op => op.Status?.Name === 'Reject').length}
                            </Typography>
                        </Box>
                    </div>
                    <Divider sx={{ borderColor: "border-gray-600", padding: 2 }} />
                    <div className="flex flex-col h-screen">
                        <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="20%"> Subject </TableCell>
                                        <TableCell align="center" width="5%"> TicketNumber </TableCell>
                                        <TableCell align="center" width="5%"> Status </TableCell>
                                        <TableCell align="center" width="5%"> Priority </TableCell>
                                        <TableCell align="center" width="10%"> ScopeOfWorkURL </TableCell>
                                        <TableCell align="center" width="5%"> View </TableCell>
                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {operation.map((item: ListOperationServiceInterface) => (
                                        <TableRow
                                            key={item.Id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{item.OperationSubject || "-"}</TableCell>
                                            <TableCell align="center">{item.OperationNumber || "-"}</TableCell>
                                            <TableCell align="center">{item.Status?.Name || "-"}</TableCell>
                                            <TableCell align="center">{item.Priority?.Name || "-"}</TableCell>
                                            <TableCell align="left">{item.ScopeOfWorkURL || "-"}</TableCell>
                                            <TableCell align="center">
                                                {
                                                    <Link href={"/customer/contract/ticket/update/" + item.Id}>
                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 75, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                        >
                                                            view
                                                        </Button>
                                                    </Link>

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
                                {`คุณต้องการลบ operation ${operation.filter((emp) => (emp.Id === deleteID)).at(0)?.OperationSubject} จริงหรือไม่`}
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

        </Layout>
    )

}

export default Ticket;