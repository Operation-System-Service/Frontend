"use client";

import Layout from "@/app/(web)/layout";
import { DeviceConfigBackupInterface, ContractCreateInterface, CreateDeviceConfigBackupInterface, CreateDeviceInterface, CreateSoftwareInterface, DeviceInterface, SoftwareInterface, CreateSoftwareConfigBackupInterface, SoftwareConfigBackupInterface } from "@/interfaces/IContract";
import { Alert, Box, Button, CardContent, CardHeader, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, Select, SelectChangeEvent, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Tooltip } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CreateDeviceConfigBackup, CreateDevice, CreateSoftware, DeleteDeviceConfigBackupById, DeleteDeviceById, DeleteSoftwareById, getContractByID, LisSoftwareByContractId, ListDeviceConfigBackupByContractId, ListDeviceByContractId, UpdateDeviceConfigBackup, UpdateDevice, UpdateSoftware, UpdateSoftwareConfigBackup, CreateSoftwareConfigBackup, ListSoftwareConfigBackupByContractId, DeleteSoftwareConfigBackupById } from "@/services/Contract/ContractServices";
import { ContentCopy } from "@mui/icons-material";
import { ListOperationServiceInterface } from "@/interfaces/IOperationService";
import { GetOperationServiceByContractId, GetOperationServiceById } from "@/services/Operation/OperationServices";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
export default function Config({ params: { slug } }: { params: { slug: string } }) {
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
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
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

    const [contract, setContract] = React.useState<Partial<ContractCreateInterface>>({
        Cost: 0.0,
        ServiceCatalogID: 0,
        SlaID: 0
    })
    const [createConfig, setCreateConfig] = React.useState<Partial<CreateDeviceConfigBackupInterface>>({})
    const [listConfigs, setListConfigs] = React.useState<Partial<DeviceConfigBackupInterface>[]>([])
    const [updateState, setUpdateState] = React.useState<boolean>(false)
    const [createConfigSoftware, setCreateConfigSoftware] = React.useState<Partial<CreateSoftwareConfigBackupInterface>>({})
    const [listConfigSoftware, setListConfigsSoftware] = React.useState<Partial<SoftwareConfigBackupInterface>[]>([])
    const [updateStateSoftware, setUpdateStateSoftware] = React.useState<boolean>(false)

    const [device, setDevice] = React.useState<Partial<DeviceInterface>[]>([])
    const [selectDevice, setSelectDevice] = React.useState<Partial<DeviceInterface>>()
    const [operationService, setOperationService] = React.useState<Partial<ListOperationServiceInterface>[]>([])
    const [selectOperationService, setSelectOperationService] = React.useState<Partial<ListOperationServiceInterface>>()
    const [selectOperationServiceSoftware, setSelectOperationServiceSoftware] = React.useState<Partial<ListOperationServiceInterface>>()

    const [software, setSoftware] = React.useState<Partial<SoftwareInterface>[]>([])
    const [selectSoftware, setSelectSoftware] = React.useState<Partial<SoftwareInterface>>()

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Config;

        const { value } = event.target;

        setCreateConfig({ ...createConfig, [id]: value });
    };
    const handleInputChangeSoftware = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Config;

        const { value } = event.target;

        setCreateConfigSoftware({ ...createConfigSoftware, [id]: value });
    };

    const handleCopyClick = () => {
        const url = selectOperationService?.ScopeOfWorkURL || "-";
        if (url !== "-") {
            navigator.clipboard.writeText(url).then(
                (err) => {
                    console.error("Could not copy text: ", err);
                }
            );
        }
    };

    const getConfigByContractId = async (id: string) => {
        let res = await ListDeviceConfigBackupByContractId(id);
        if (res && res.Status !== "error") {
            console.log(res)
            setListConfigs(res)
        }
    }
    const getConfigSoftwareByContractId = async (id: string) => {
        let res = await ListSoftwareConfigBackupByContractId(id);
        if (res && res.Status !== "error") {
            console.log(res)
            setListConfigsSoftware(res)
        }
    }
    const getOperationByContractId = async (id: string) => {
        let res = await GetOperationServiceByContractId(id);
        if (res) {
            setOperationService(res)
        }
    }
    const getDeviceByContractId = async (id: string) => {
        let res = await ListDeviceByContractId(id);
        if (res) {
            setDevice(res)
        }
    }

    const getSoftwareByContractId = async (id: string) => {
        let res = await LisSoftwareByContractId(id);
        if (res) {
            setSoftware(res)
        }
    }

    const getContract = async (id: string | undefined) => {
        let res = await getContractByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setContract(res)
            console.log("contract")
            console.log(contract)
        }
    }
    React.useEffect(() => {
        getConfigByContractId(slug);
        getContract(slug);
        getOperationByContractId(slug);
        getDeviceByContractId(slug);
        getSoftwareByContractId(slug);
        getConfigSoftwareByContractId(slug);
    }, []);

    const handleChangeDevice = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setCreateConfig((prevDevice) => ({
            ...prevDevice,
            [name as string]: value,
        }));

        // Find the selected site by name
        const selectedDevice = device.find((site) => site.Id === value);
        console.log("selectedSite: ", selectedDevice)
        if (selectedDevice) {
            // Update the fields with the selected site's data
            setSelectDevice({
                Brand: selectedDevice.Brand,
                Model: selectedDevice.Model,
                Serial: selectedDevice.Serial,
                License: selectedDevice.License,
                Sku: selectedDevice.Sku,
            });
        }
    };
    const handleChangeSoftware = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setCreateConfigSoftware((prevDevice) => ({
            ...prevDevice,
            [name as string]: value,
        }));

        // Find the selected site by name
        const selectedSoftware = software.find((site) => site.Id === value);
        console.log("selectedSite: ", selectedSoftware)
        if (selectedSoftware) {
            // Update the fields with the selected site's data
            setSelectSoftware({
                Brand: selectedSoftware.Brand,
                Model: selectedSoftware.Model,
                Quantity: selectedSoftware.Quantity,
                License: selectedSoftware.License,
                Sku: selectedSoftware.Sku,
            });
        }
    };
    const handleChangeOperation = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setCreateConfig((prevDevice) => ({
            ...prevDevice,
            [name as string]: value,
        }));

        // Find the selected site by name
        const selectedOperation = operationService.find((op) => op.Id === value);
        console.log("selectedSite: ", selectedOperation)
        if (selectedOperation) {
            // Update the fields with the selected site's data
            setSelectOperationService({
                OperationSubject: selectedOperation.OperationSubject,
                OperationSiteName: selectedOperation.OperationSiteName,
                ScopeOfWorkURL: selectedOperation.ScopeOfWorkURL,
            });
        }
    };
    const handleChangeOperationSoftware = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setCreateConfigSoftware((prevDevice) => ({
            ...prevDevice,
            [name as string]: value,
        }));

        // Find the selected site by name
        const selectedOperation = operationService.find((op) => op.Id === value);
        console.log("selectedSite: ", selectedOperation)
        if (selectedOperation) {
            // Update the fields with the selected site's data
            setSelectOperationServiceSoftware({
                OperationSubject: selectedOperation.OperationSubject,
                OperationSiteName: selectedOperation.OperationSiteName,
                ScopeOfWorkURL: selectedOperation.ScopeOfWorkURL,
            });
        }
    };
    const handleDiscard = () => {
        setCreateConfig({});
        setUpdateState(false);
        setSelectDevice({});
    }
    const handleDiscardSoftware = () => {
        setCreateConfigSoftware({});
        setUpdateStateSoftware(false);
        setSelectSoftware({});
    }


    const handleUpdate = (cf: DeviceConfigBackupInterface) => {
        setUpdateState(true)
        setCreateConfig({
            ...createConfig,
            Id: cf.Id,
            DeviceID: cf.DeviceID,
            FilePath: cf.FilePath,
            Note: cf.Note,
            OperationServiceID: cf.OperationServiceID
        });
    }
    const handleUpdateSoftware = (sw: SoftwareConfigBackupInterface) => {
        setUpdateStateSoftware(true)
        setCreateConfigSoftware({
            ...createConfigSoftware,
            Id: sw.Id,
            SoftwareID: sw.SoftwareID,
            FilePath: sw.FilePath,
            Note: sw.Note,
            OperationServiceID: sw.OperationServiceID
        });
    }
    const submit = async () => {
        try {

            if (updateState) {
                let res = await UpdateDeviceConfigBackup(createConfig)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                    setUpdateState(false)
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }
                setUpdateState(false)

            } else {
                let res = await CreateDeviceConfigBackup(createConfig)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }

            }
            getConfigByContractId(slug);

        } catch (error) {
            console.error("Error submitting contract data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }
    const submitSoftware = async () => {
        try {

            if (updateStateSoftware) {
                let res = await UpdateSoftwareConfigBackup(createConfigSoftware)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                    setUpdateState(false)
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }
                setUpdateStateSoftware(false)

            } else {
                let res = await CreateSoftwareConfigBackup(createConfigSoftware)
                if (res && res.Status !== "error") {
                    setAlertMessage("บันทึกข้อมูลสำเร็จ");
                    setSuccess(true);
                } else {
                    setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                    setError(true);
                }

            }
            getConfigSoftwareByContractId(slug);

        } catch (error) {
            console.error("Error submitting contract data:", error);
            setAlertMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            setError(true);
        }
    }

    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<string>("")

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDelete = async () => { // when click submit
        let res = await DeleteDeviceConfigBackupById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getConfigByContractId(slug);
        setOpenDelete(false)

    }
    const handleDeleteSoftware = async () => { // when click submit
        let res = await DeleteSoftwareConfigBackupById(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getConfigSoftwareByContractId(slug);
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
    const [tabValue, setTabValue] = React.useState(1);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                            title={`Config management`}
                        />
                    </div>
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
                    <TabContext value={String(tabValue)}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                <Tab label="Device" value="1" />
                                <Tab label="Software" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, flexGrow: 1 }}>
                                <div>
                                    <div style={{ marginTop: "10px" }}>

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Note</p>

                                                    <TextField
                                                        id="Note"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        value={createConfig.Note || ""}
                                                        onChange={handleInputChange}
                                                        style={{ color: "black" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>FilePath</p>

                                                    <TextField
                                                        id="FilePath"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        value={createConfig.FilePath || ""}
                                                        onChange={handleInputChange}
                                                        style={{ color: "black" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Device Serial Number</p>
                                                    <Select
                                                        native
                                                        value={createConfig.DeviceID ?? ""}
                                                        onChange={handleChangeDevice}
                                                        inputProps={{
                                                            name: "DeviceID",
                                                        }}
                                                    >
                                                        <option value={0} key={0}>
                                                            กรุณา เลือกอุปกรณ์
                                                        </option>
                                                        {device.map((item: DeviceInterface) => (
                                                            <option key={item.Id} value={item.Id}>{item.Serial}</option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>

                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Device Brand</p>

                                                    <TextField
                                                        id="Brand"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectDevice?.Brand || "-"}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Device Model</p>

                                                    <TextField
                                                        id="Model"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectDevice?.Model || "-"}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Device SKU</p>

                                                    <TextField
                                                        id="Sku"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectDevice?.Sku || "-"}
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

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation Service Subject</p>
                                                    <Select
                                                        native
                                                        value={createConfig.OperationServiceID ?? ""}
                                                        onChange={handleChangeOperation}
                                                        inputProps={{
                                                            name: "OperationServiceID",
                                                        }}
                                                    >
                                                        <option value={0} key={0}>
                                                            กรุณา เลือก operation service subject
                                                        </option>
                                                        {operationService.map((item: Partial<ListOperationServiceInterface>) => (
                                                            <option key={item.Id} value={item.Id!}>{item.OperationSubject}</option>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation Site Name</p>

                                                    <TextField
                                                        id="OperationSiteName"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectOperationService?.OperationSiteName || "-"}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation ScopeOfWorkURL</p>

                                                    <TextField
                                                        id="ScopeOfWorkURL"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectOperationService?.ScopeOfWorkURL || "-"}
                                                        onChange={handleInputChange}
                                                        style={{ color: "black" }}
                                                        InputProps={{
                                                            style: {
                                                                backgroundColor: "#e8e8e8", // Dark background color
                                                                color: "#000000", // Light text color
                                                            },
                                                            endAdornment: selectOperationService?.ScopeOfWorkURL ? (
                                                                <Tooltip title="Copy URL">
                                                                    <IconButton
                                                                        onClick={handleCopyClick}
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

                                        <div style={{ marginLeft: "6.5%" }} className="flex justify-between px-5 py-3">
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                onClick={handleDiscard}
                                                sx={{
                                                    maxWidth: 75, // Set the maximum width of the button
                                                    maxHeight: 60, // Set the maximum height of the button
                                                }}
                                            >
                                                Discard
                                            </Button>
                                            <Button
                                                style={{ marginRight: "6.5%" }}
                                                variant="outlined"
                                                color="info"
                                                onClick={submit}
                                                sx={{
                                                    maxWidth: 75, // Set the maximum width of the button
                                                    maxHeight: 60, // Set the maximum height of the button
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                    <Divider sx={{ borderColor: "border-gray-600" }} />
                                    <div style={{ height: 800, minHeight: "100%", width: "100%", backgroundColor: "#f8f9fa" }} >
                                        <TableContainer  >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" width="12%"> Note </TableCell>
                                                        <TableCell align="center" width="10%"> FilePath </TableCell>
                                                        <TableCell align="center" width="5%"> Brand </TableCell>
                                                        <TableCell align="center" width="10%"> Model </TableCell>
                                                        <TableCell align="center" width="5%"> Serial </TableCell>
                                                        <TableCell align="center" width="12%"> License </TableCell>
                                                        <TableCell align="center" width="10%"> SKU </TableCell>
                                                        <TableCell align="center" width="5%"> Edit </TableCell>
                                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {listConfigs.map((item: DeviceConfigBackupInterface) => (
                                                        <TableRow
                                                            key={item.Id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{item.Note}</TableCell>
                                                            <TableCell align="center">{item.FilePath}</TableCell>
                                                            <TableCell align="center">{item.Device?.Brand}</TableCell>
                                                            <TableCell align="center">{item.Device?.Model}</TableCell>
                                                            <TableCell align="center">{item.Device?.Serial}</TableCell>
                                                            <TableCell align="center">{item.Device?.License}</TableCell>
                                                            <TableCell align="center">{item.Device?.Sku}</TableCell>
                                                            <TableCell>
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
                                                                        onClick={() => { handleDialogDeleteOpen(item.Id!) }}
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
                                                {`คุณต้องการลบข้อมูล config ของอุปกรณ์ : ${listConfigs.filter((emp) => (emp.Id === deleteID)).at(0)?.Device?.Brand} จริงหรือไม่`}
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
                        <CardContent style={{ backgroundColor: "#f8f9fa" }} sx={{ p: 0, px: 2, flexGrow: 1 }}>
                                <div>
                                    <div style={{ marginTop: "10px" }}>

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Note</p>

                                                    <TextField
                                                        id="Note"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        value={createConfigSoftware.Note || ""}
                                                        onChange={handleInputChangeSoftware}
                                                        style={{ color: "black" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>FilePath</p>

                                                    <TextField
                                                        id="FilePath"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        value={createConfigSoftware.FilePath || ""}
                                                        onChange={handleInputChangeSoftware}
                                                        style={{ color: "black" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Software Serial Number</p>
                                                    <Select
                                                        native
                                                        value={createConfigSoftware.SoftwareID ?? ""}
                                                        onChange={handleChangeSoftware}
                                                        inputProps={{
                                                            name: "SoftwareID",
                                                        }}
                                                    >
                                                        <option value={0} key={0}>
                                                            กรุณา เลือกซอฟแวร์
                                                        </option>
                                                        {software.map((item: SoftwareInterface) => (
                                                            <option key={item.Id} value={item.Id}>{item.Sku}</option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>

                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Software Brand</p>

                                                    <TextField
                                                        id="Brand"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectSoftware?.Brand || "-"}
                                                        onChange={handleInputChangeSoftware}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Software Model</p>

                                                    <TextField
                                                        id="Model"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectSoftware?.Model || "-"}
                                                        onChange={handleInputChangeSoftware}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Software License</p>

                                                    <TextField
                                                        id="Sku"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectSoftware?.License || "-"}
                                                        onChange={handleInputChangeSoftware}
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

                                        <Grid container spacing={3} sx={{ padding: 1 }} style={{ marginLeft: "5%" }}>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation Service Subject</p>
                                                    <Select
                                                        native
                                                        value={createConfigSoftware.OperationServiceID ?? ""}
                                                        onChange={handleChangeOperationSoftware}
                                                        inputProps={{
                                                            name: "OperationServiceID",
                                                        }}
                                                    >
                                                        <option value={0} key={0}>
                                                            กรุณา เลือก operation service subject
                                                        </option>
                                                        {operationService.map((item: Partial<ListOperationServiceInterface>) => (
                                                            <option key={item.Id} value={item.Id!}>{item.OperationSubject}</option>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation Site Name</p>

                                                    <TextField
                                                        id="OperationSiteName"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectOperationServiceSoftware?.OperationSiteName || "-"}
                                                        onChange={handleInputChangeSoftware}
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
                                            <Grid item xs={3.5}>
                                                <FormControl fullWidth variant="outlined">
                                                    <p style={{ color: "black" }}>Operation ScopeOfWorkURL</p>

                                                    <TextField
                                                        id="ScopeOfWorkURL"
                                                        variant="outlined"
                                                        type="string"
                                                        size="medium"
                                                        disabled
                                                        value={selectOperationServiceSoftware?.ScopeOfWorkURL || "-"}
                                                        onChange={handleInputChangeSoftware}
                                                        style={{ color: "black" }}
                                                        InputProps={{
                                                            style: {
                                                                backgroundColor: "#e8e8e8", // Dark background color
                                                                color: "#000000", // Light text color
                                                            },
                                                            endAdornment: selectOperationService?.ScopeOfWorkURL ? (
                                                                <Tooltip title="Copy URL">
                                                                    <IconButton
                                                                        onClick={handleCopyClick}
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

                                        <div style={{ marginLeft: "6.5%" }} className="flex justify-between px-5 py-3">
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                onClick={handleDiscardSoftware}
                                                sx={{
                                                    maxWidth: 75, // Set the maximum width of the button
                                                    maxHeight: 60, // Set the maximum height of the button
                                                }}
                                            >
                                                Discard
                                            </Button>
                                            <Button
                                                style={{ marginRight: "6.5%" }}
                                                variant="outlined"
                                                color="info"
                                                onClick={submitSoftware}
                                                sx={{
                                                    maxWidth: 75, // Set the maximum width of the button
                                                    maxHeight: 60, // Set the maximum height of the button
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                    <Divider sx={{ borderColor: "border-gray-600" }} />
                                    <div style={{ height: 800, minHeight: "100%", width: "100%", backgroundColor: "#f8f9fa" }} >
                                        <TableContainer  >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" width="12%"> Note </TableCell>
                                                        <TableCell align="center" width="10%"> FilePath </TableCell>
                                                        <TableCell align="center" width="5%"> Brand </TableCell>
                                                        <TableCell align="center" width="10%"> Model </TableCell>
                                                        <TableCell align="center" width="5%"> Quantity </TableCell>
                                                        <TableCell align="center" width="12%"> License </TableCell>
                                                        <TableCell align="center" width="10%"> SKU </TableCell>
                                                        <TableCell align="center" width="5%"> Edit </TableCell>
                                                        <TableCell align="center" width="5%"> Delete </TableCell>

                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {listConfigSoftware.map((item: SoftwareConfigBackupInterface) => (
                                                        <TableRow
                                                            key={item.Id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{item.Note}</TableCell>
                                                            <TableCell align="center">{item.FilePath}</TableCell>
                                                            <TableCell align="center">{item.Software?.Brand}</TableCell>
                                                            <TableCell align="center">{item.Software?.Model}</TableCell>
                                                            <TableCell align="center">{item.Software?.Quantity}</TableCell>
                                                            <TableCell align="center">{item.Software?.License}</TableCell>
                                                            <TableCell align="center">{item.Software?.Sku}</TableCell>
                                                            <TableCell>
                                                                {
                                                                    <Button
                                                                        variant='outlined'
                                                                        color='warning'
                                                                        sx={{
                                                                            maxWidth: 75, // Set the maximum width of the button
                                                                            maxHeight: 60, // Set the maximum height of the button
                                                                        }}
                                                                        onClick={() => handleUpdateSoftware(item)}
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
                                                                        onClick={() => { handleDialogDeleteOpen(item.Id!) }}
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
                                                {`คุณต้องการลบข้อมูล config ของซอฟแวร์ : ${listConfigSoftware.filter((emp) => (emp.Id === deleteID)).at(0)?.Software?.Brand} จริงหรือไม่`}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                                                <Button onClick={handleDeleteSoftware} className="bg-red" autoFocus>
                                                    ยืนยัน
                                                </Button>
                                            </DialogActions>

                                        </Dialog>

                                    </div>
                                </div>
                            </CardContent>


                        </TabPanel>
                    </TabContext>


                </ThemeProvider>
            </Layout>
        </LocalizationProvider >
    );
};
