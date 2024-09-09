"use client"
import { Button, CardHeader, Divider, Grid, TextField, CardContent, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, ThemeProvider, createTheme, Tab, FormControl } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../layout";
import { CreateCustomerGroupInterface, CustomerGroupInterface, CustomerInterface } from "@/interfaces/ICustomer";

import React from "react";

import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";
import { DeleteCustomerById, ListCustomers, GetSearchCustomer, UpdateCustomerGroup, ListCustomerGroups, CreateCustomerGroup, DeleteCustomerGroupById } from "@/services/Customer/CustomerServices";
import Link from "next/link";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Customer = ({ children }: any) => {
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
    const { settings, saveSettings } = useSettings()
    //Customer State
    const [customer, setCustomer] = React.useState<CustomerInterface[]>([])
    const getCustomer = async () => {
        let res = await ListCustomers();
        if (res) {
            setCustomer(res)
            console.log(res)
            console.log(customer)
        }
    }
    //Customer State
    const [customerGroups, setCustomerGroups] = React.useState<CustomerGroupInterface[]>([])
    const getCustomerGroup = async () => {
        let res = await ListCustomerGroups();
        if (res) {
            setCustomerGroups(res)
            console.log(res)
            console.log(customer)
        }
    }
    React.useEffect(() => {
        getCustomer();
        getCustomerGroup();
        console.log(customer)

    }, [])
    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openDeleteCustomerGroup, setOpenDeleteCustomerGroup] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteCustomerById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getCustomer();
        setOpenDelete(false)
    }
    const handleDeleteCustomerGroup = async () => { // when click submit
        let res = await DeleteCustomerGroupById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getCustomerGroup();
        setOpenDelete(false)
    }
    const [searchValue, setSearchValue] = React.useState<string>("")
    const handleInputChange = (
        event: React.ChangeEvent<{ value: any }>
    ) => {

        const { value } = event.target;
        setSearchValue(value);
    };
    // handle
    const handleInputChangeCustomerGroup = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Customer;

        const { value } = event.target;

        setCustomerGroupCreate({ ...customerGroupCreate, [id]: value });
    };

    const handleSearch = async () => {
        if (searchValue == "") {
            getCustomer()
        } else {
            let res = await GetSearchCustomer(searchValue)
            if (res) {
                console.log(res)
            } else {
                console.log(res)
            }
            setCustomer(res);

        }

    }

    const handleDialogDeleteOpen = (ID: string) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }
    const handleDialogDeleteOpenCustomerGroup = (ID: number) => {
        setDeleteID(String(ID))
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID("")
        }, 500)
    }
    const handleDialogDeleteCustomerGroupClose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID("")
        }, 500)
    }

    const [tabValue, setTabValue] = React.useState(1);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const [customerGroupCreate, setCustomerGroupCreate] = React.useState<Partial<CustomerGroupInterface>>({});
    const [updateState, setUpdateState] = React.useState<boolean>(false)
    const handleUpdate = (customerGroup: CustomerGroupInterface) => {
        setUpdateState(true)
        setCustomerGroupCreate({
            ...customerGroupCreate,
            Id: customerGroup.Id,
            Name: customerGroup.Name,
            Description: customerGroup.Description,
        });
    }
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const handleDiscard = () => {
        setCustomerGroupCreate({});
    }

    const submitCustomerGroup = async () => {
        try {
            if (updateState) {
                const res = await UpdateCustomerGroup(customerGroupCreate);
                if (res && res.Status !== "error") {
                    getCustomerGroup();
                } else {
                    console.log(res)
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการอัพเดท customer group");
                    setError(true);
                }
                setUpdateState(false)
            } else {
                const res = await CreateCustomerGroup(customerGroupCreate);
                if (res && res.Status !== "error") {
                    getCustomerGroup();
                } else {
                    console.log(res)
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการสร้าง customer group");
                    setError(true);
                }

            }

        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Address");
            setError(true);
        }
    }

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
                    title="Customer & Contract Management"
                ></CardHeader>
            </div>
            <TabContext value={String(tabValue)}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Customer Profile" value="1" />
                        <Tab label="Customer Group" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, flexGrow: 1 }}>
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
                                            value={searchValue || ""}
                                            onChange={handleInputChange}

                                        />
                                    </Grid>
                                    <Grid className="flex justify-center flex-col-reverse" sx={{ paddingTop: "4px" }} xs={0.5}>
                                        <Button
                                            variant="contained"
                                            onClick={() => { handleSearch() }}
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
                                            href="/customer/createProfile"
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
                                                <TableCell align="center" width="30%"> Company Name </TableCell>
                                                <TableCell align="center"> TaxNumber </TableCell>
                                                <TableCell align="center"> Customer Group </TableCell>
                                                <TableCell align="center" width="5%"> Contract </TableCell>
                                                <TableCell align="center" width="5%"> View </TableCell>
                                                <TableCell align="center" width="5%"> Delete </TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {customer.map((item: CustomerInterface) => (
                                                <TableRow
                                                    key={item.Id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{item.CompanyName || "-"}</TableCell>
                                                    <TableCell align="center">{item.TaxNumber || "-"}</TableCell>
                                                    <TableCell align="center">{customerGroups.find((group) => group.Id == item.CustomerGroupId)?.Name}</TableCell>

                                                    <TableCell align="center">
                                                        {
                                                            <Link href={"/customer/contract/create/" + item.Id}>
                                                                <Button
                                                                    variant='outlined'
                                                                    color='info'
                                                                    sx={{
                                                                        maxWidth: 85, // Set the maximum width of the button
                                                                        maxHeight: 60, // Set the maximum height of the button
                                                                    }}
                                                                >
                                                                    contract
                                                                </Button>
                                                            </Link>

                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            <Link href={"/customer/update/" + item.Id}>
                                                                <Button
                                                                    variant='outlined'
                                                                    color='warning'
                                                                    sx={{
                                                                        maxWidth: 75, // Set the maximum width of the button
                                                                        maxHeight: 60, // Set the maximum height of the button
                                                                    }}
                                                                >
                                                                    View
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
                                        {`คุณต้องการลบข้อมูลของลูกค้า ${customer.filter((emp) => (emp.Id === deleteID)).at(0)?.CompanyName} จริงหรือไม่`}
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
                </TabPanel>

                <TabPanel value="2">
                    <ThemeProvider theme={theme}>
                        <div className="flex flex-col h-screen">
                            <div className=" justify-center ">
                                <Grid container spacing={5} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Name</p>

                                            <TextField
                                                id="Name"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerGroupCreate.Name || ""}
                                                onChange={handleInputChangeCustomerGroup}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Description</p>

                                            <TextField
                                                id="Description"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerGroupCreate.Description || ""}
                                                onChange={handleInputChangeCustomerGroup}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            onClick={handleDiscard}
                                            sx={{
                                                maxWidth: 75, // Set the maximum width of the button
                                                maxHeight: 60, // Set the maximum height of the button
                                            }}


                                        >
                                            Discard
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{ float: "right" }}
                                            variant="contained"
                                            onClick={submitCustomerGroup}
                                            sx={{
                                                maxWidth: 75, // Set the maximum width of the button
                                                maxHeight: 60, // Set the maximum height of the button
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>

                                </Grid>
                            </div>


                            <TableContainer >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="10%"> Name </TableCell>
                                            <TableCell align="center" width="15%"> Description </TableCell>
                                            <TableCell align="center" width="5%"> Update </TableCell>
                                            <TableCell align="center" width="10%"> Delete </TableCell>

                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {customerGroups.map((item: CustomerGroupInterface) => (
                                            <TableRow
                                                key={item.Id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{item.Name || "-"}</TableCell>
                                                <TableCell align="center">{item.Description || "-"}</TableCell>

                                                <TableCell align="center">
                                                    {

                                                        <Button
                                                            variant='outlined'
                                                            color='warning'
                                                            sx={{
                                                                maxWidth: 75, // Set the maximum width of the button
                                                                maxHeight: 60, // Set the maximum height of the button
                                                            }}
                                                            onClick={() => { handleUpdate(item) }}
                                                        >
                                                            Update
                                                        </Button>


                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    {

                                                        <Button
                                                            variant='outlined'
                                                            color='error'
                                                            onClick={() => { handleDialogDeleteOpenCustomerGroup(item.Id) }}
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
                            <Dialog
                                open={openDelete}
                                onClose={handleDialogDeleteCustomerGroupClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                    style: {
                                        backgroundColor: "#f8f9fa",
                                    },
                                }}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {`คุณต้องการลบข้อมูลกลุ่มลูกค้า ${customerGroups.filter((emp) => (String(emp.Id) === deleteID)).at(0)?.Name} จริงหรือไม่`}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                                    <Button onClick={handleDeleteCustomerGroup} className="bg-red" autoFocus>
                                        ยืนยัน
                                    </Button>
                                </DialogActions>

                            </Dialog>
                        </div>


                    </ThemeProvider>
                </TabPanel>
            </TabContext>


        </Layout>
    )

}

export default Customer;