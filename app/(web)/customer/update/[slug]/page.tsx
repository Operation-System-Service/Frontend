"use client"
import { Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, SelectChangeEvent, Select, Tabs, Tab, Box, Divider, Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'

import { CustomerAddressInterface, CustomerGroupInterface, CustomerInterface } from '@/interfaces/ICustomer'
import { UpdateCustomer, GetCustomerByID, ListCustomerGroups, ListCustomerAddresses, CreateCustomerAddress, DeleteCustomerAddressById, UpdateCustomerAddress, GetCustomerAddressCustomerByID } from '@/services/Customer/CustomerServices'
import { useRouter } from 'next/navigation'
import Layout from '@/app/(web)/layout'
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function CustomerUpdate({ params: { slug } }: { params: { slug: string } }) {

    let router = useRouter()
    // List all Database
    // Get Customer by id
    const [customer, setCustomer] = React.useState<Partial<CustomerInterface>>({})
    const getCustomer = async (id: string | undefined) => {
        let res = await GetCustomerByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setCustomer(res)
            console.log("customer")
            console.log(customer)
        }
    }
    const [customerGroup, setCustomerGroup] = React.useState<CustomerGroupInterface[]>([]);
    const getCustomerGroup = async () => {
        try {
            const res = await ListCustomerGroups();
            if (res && res.Status !== "error") {
                setCustomerGroup(res)
            } else {
                console.log(res)
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดดึงข้อมูล Customer Group");
                setError(true);
            }
        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Group");
            setError(true);
        }
    }
    const [customerAddress, setCustomerAddress] = React.useState<CustomerAddressInterface[]>([]);
    const getCustomerAddress = async () => {
        try {
            const res = await GetCustomerAddressCustomerByID(slug);
            if (res && res.Status !== "error") {
                setCustomerAddress(res)
            } else {
                console.log(res)
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดดึงข้อมูล Customer Group");
                setError(true);
            }
        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Address");
            setError(true);
        }
    }
    const [customerAddressCreate, setCustomerAddressCreate] = React.useState<Partial<CustomerAddressInterface>>({});
    const submitCustomerAddress = async () => {
        try {
            customerAddressCreate.CustomerID = slug
            if (updateState) {
                const res = await UpdateCustomerAddress(customerAddressCreate);
                if (res && res.Status !== "error") {
                    getCustomerAddress();
                } else {
                    console.log(res)
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการอัพเดท customer address");
                    setError(true);
                }
                setUpdateState(false)
            } else {
                const res = await CreateCustomerAddress(customerAddressCreate);
                if (res && res.Status !== "error") {
                    getCustomerAddress();
                } else {
                    console.log(res)
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการสร้าง customer address");
                    setError(true);
                }

            }

        } catch (error) {
            console.log(error)
            setAlertMessage("เกิดข้อผิดพลาดดึงข้อมูล Customer Address");
            setError(true);
        }
    }

    React.useEffect(() => {
        console.log("slug");
        console.log(slug);
        getCustomerGroup();
        getCustomer(slug);
        getCustomerAddress();
    }, []);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(customer)
        try {
            customer.CustomerGroupId = convertType(customer.CustomerGroupId)
            let res = await UpdateCustomer(customer)
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }

            setTimeout(() => {
                router.push("/customer")
            }, 3000)


        } catch (error) {
            console.error("Error submitting customer data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };


    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CustomerUpdate;

        const { value } = event.target;

        setCustomer({ ...customer, [id]: value });
    };
    const handleInputChangeAddress = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CustomerUpdate;

        const { value } = event.target;

        setCustomerAddressCreate({ ...customerAddressCreate, [id]: value });
    };
    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof customer;
        setCustomer({
            ...customer,
            [name]: event.target.value,
        });
    };

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof customer;

        setCustomer({
            ...customer,
            [name]: event.target.value
        })
    }

    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<number>(0)

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteCustomerAddressById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getCustomerAddress();
        setOpenDelete(false)

    }
    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }
    const [updateState, setUpdateState] = React.useState<boolean>(false)
    const handleUpdate = (customerAddress: CustomerAddressInterface) => {
        setUpdateState(true)
        setCustomerAddressCreate({
            ...customerAddressCreate,
            Id: customerAddress.Id,
            SiteName: customerAddress.SiteName,
            Address: customerAddress.Address,
            GoogleMapURL: customerAddress.GoogleMapURL,
            Description: customerAddress.Description,
            ContactEmail: customerAddress.ContactEmail,
            ContactLineID: customerAddress.ContactLineID,
            ContactNumber: customerAddress.ContactNumber,
            ContactPerson: customerAddress.ContactPerson,
            CustomerID: slug,

        });
    }

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
            },
            background: { default: "#f8f9fa" }
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

    const [tabValue, setTabValue] = React.useState(1);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleDiscard = () => {
        setCustomerAddressCreate({});
    }

    return (
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
                        title="Customer Management"
                    ></CardHeader>
                </div>
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
                        {message}
                    </Alert>
                </Snackbar>
                <TabContext value={String(tabValue)}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Customer Profile" value="1" />
                            <Tab label="Address" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Container maxWidth="lg" >
                            <div className="flex flex-col h-screen">
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={10}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Company Name</p>

                                            <TextField
                                                id="CompanyName"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customer.CompanyName || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}

                                            />
                                        </FormControl>
                                    </Grid>


                                </Grid>

                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Tax Number</p>

                                            <TextField
                                                id="TaxNumber"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customer.TaxNumber || ""}
                                                onChange={handleInputChange}
                                                style={{ color: "black" }}
                                                inputProps={{ maxLength: 13 }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Customer Group</p>
                                            <Select
                                                native
                                                value={customer.CustomerGroupId ?? 0}
                                                onChange={handleChangeNumber}
                                                inputProps={{
                                                    name: "CustomerGroupId",
                                                }}
                                            >
                                                <option value={0} key={0}>
                                                    กรุณา เลือก customer group
                                                </option>
                                                {customerGroup.map((item: CustomerGroupInterface) => (
                                                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={4}>
                                        <a href={"/customer"}>
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
                    </TabPanel>
                    <TabPanel value="2">
                        <div className="flex flex-col h-screen">
                            <div className=" justify-center ">
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>SiteName</p>

                                            <TextField
                                                id="SiteName"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.SiteName || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>GoogleMapURL</p>

                                            <TextField
                                                id="GoogleMapURL"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.GoogleMapURL || ""}
                                                onChange={handleInputChangeAddress}

                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Contact Person</p>
                                            <TextField
                                                id="ContactPerson"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.ContactPerson || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>


                                </Grid>
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>LineID</p>

                                            <TextField
                                                id="ContactLineID"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.ContactLineID || ""}
                                                onChange={handleInputChangeAddress}
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
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.ContactNumber || ""}
                                                onChange={handleInputChangeAddress}

                                                style={{ color: "black" }}
                                                inputProps={{ maxLength: 10 }}

                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Email</p>
                                            <TextField
                                                id="ContactEmail"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.ContactEmail || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>

                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Contact Person</p>
                                            <TextField
                                                id="ContactPerson"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.ContactPerson || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>
                              
                                
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Address</p>
                                            <TextField
                                                id="Address"
                                                variant="outlined"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.Address || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="outlined">
                                            <p style={{ color: "black" }}>Description</p>
                                            <OutlinedInput
                                                id="Description"
                                                type="string"
                                                size="medium"
                                                value={customerAddressCreate.Description || ""}
                                                onChange={handleInputChangeAddress}
                                                style={{ color: "black" }}
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>


                                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                    <Grid item xs={1}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                "&.MuiButton-root": {
                                                    backgroundColor: "#0082EF",
                                                },
                                            }}
                                            onClick={handleDiscard}
                                        >
                                            Discard
                                        </Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Button
                                            style={{ float: "right" }}
                                            onClick={submitCustomerAddress}
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                "&.MuiButton-root": {
                                                    backgroundColor: "#0082EF",
                                                },
                                            }}
                                        >
                                            create / update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                            <Divider sx={{ borderColor: "border-gray-600" }} />
                            <div className="flex-1 p-3 justify-center">
                                <TableContainer style={{ maxHeight: `calc(100vh - 350px)` }} >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" width="10%"> SiteName </TableCell>
                                                {/* <TableCell align="center" width="20%"> Address </TableCell> */}
                                                <TableCell align="center" width="20%"> Contact Person </TableCell>
                                                <TableCell align="center" width="20%"> LineID </TableCell>
                                                <TableCell align="center" width="20%"> Phone </TableCell>
                                                <TableCell align="center" width="20%"> Email </TableCell>
                                                <TableCell align="center" width="10%"> GoogleMapURL </TableCell>
                                                <TableCell align="center" width="10%"> Description </TableCell>
                                                <TableCell align="center" width="5%"> Update </TableCell>
                                                <TableCell align="center" width="5%"> Delete </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {customerAddress.map((item: CustomerAddressInterface) => (
                                                <TableRow
                                                    key={item.Id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{item.SiteName}</TableCell>
                                                   
                                                    {/* <TableCell align="center">{item.Address}</TableCell> */}
                                                    <TableCell align="center">{item.ContactPerson}</TableCell>
                                                    <TableCell align="center">{item.ContactLineID}</TableCell>
                                                    <TableCell align="center">{item.ContactNumber}</TableCell>
                                                    <TableCell align="center">{item.ContactEmail}</TableCell>
                                                    <TableCell align="center">{item.GoogleMapURL ? (
                                                        <a href={item.GoogleMapURL} target="_blank" rel="noopener noreferrer">
                                                            {item.GoogleMapURL}
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}</TableCell>
                                                    <TableCell align="center">{item.Description}</TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            <Button
                                                                variant='outlined'
                                                                color='warning'
                                                                sx={{
                                                                    maxWidth: 75, // Set the maximum width of the button
                                                                    maxHeight: 60, // Set the maximum height of the button
                                                                }}
                                                                onClick={() => handleUpdate(item)}
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
                                        {`คุณต้องการลบข้อมูล site: ${customerAddress.filter((cus) => (cus.Id === deleteID)).at(0)?.SiteName} ของลูกค้า ${customer?.CompanyName} จริงหรือไม่`}
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

                    </TabPanel>
                </TabContext>

            </ThemeProvider>
        </Layout>

    );
}


