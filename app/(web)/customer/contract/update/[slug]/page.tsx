"use client"
import { Alert, Button, FormControl, Snackbar, TextField, createTheme, OutlinedInput, ThemeProvider, CardHeader, SelectChangeEvent, Select } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'

import { useRouter } from 'next/navigation'
import Layout from '@/app/(web)/layout'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ListServiceCatalogs } from '@/services/ServiceCatalog/ServiceCatalogServices'

import { SlaInterface, SlaTypeInterface } from '@/interfaces/ISla'
import { ContractUpdateInterface } from '@/interfaces/IContract'
import { ServiceCatalogInterface } from '@/interfaces/IServiceCatalog'
import { getContractByID, UpdateContract } from '@/services/Contract/ContractServices'
import { GetSlaTypeBySla, ListSlas, ListSlasByType, ListSlaTypes } from '@/services/Sla/SlaServices'

export default function ContractUpdate({ params: { slug } }: { params: { slug: string } }) {

    let router = useRouter()
    const [sla, setSla] = React.useState<SlaInterface[]>([])
    const [service_catalog, setServiceCatalog] = React.useState<ServiceCatalogInterface[]>([])
    const [contract, setContract] = React.useState<Partial<ContractUpdateInterface>>({
        Cost: 0.0,
        ServiceCatalogID: 0,
        SlaID: 0
    })
    const [slaType, setSlaType] = React.useState<SlaTypeInterface[]>([])
    const [slaTypeNumber, setSlaTypeNumber] = React.useState<number>(0)
    const [contractStart, setContractStart] = React.useState<Dayjs>(dayjs())
    const [contractStop, setContractStop] = React.useState<Dayjs>(dayjs())
    const [noticeDate, setNoticeDate] = React.useState<Dayjs>(dayjs())
    const getContract = async (id: string | undefined) => {
        let res = await getContractByID(id)
        if (res && res.Status !== "error") {
            console.log(res)
            setContract(res)
            console.log("contract")
            console.log(contract)

            if (res.ContractStart && res.ContractStart !== "") {
                setContractStart(dayjs(res.ContractStart.substring(0, 10)));
            }
            if (res.ContractStop && res.ContractStop !== "") {
                setContractStop(dayjs(res.ContractStop.substring(0, 10)))
            }
            getSlaTypeByTypeId(res.SlaID)

        }
    }


    const getServiceCatalog = async () => {

        let res = await ListServiceCatalogs();
        console.log(res);
        if (res) {
            setServiceCatalog(res);
        }
    }
    const getSlaByType = async (id: number) => {
        if(slaTypeNumber==0){
            let res = await ListSlas();
            console.log(res);
            if (res) {
                setSla(res);
            }

        }else{
            let res = await ListSlasByType(id);
            console.log(res);
            if (res) {
                setSla(res);
            }
        }
    }
    const getSlaTypeByTypeId = async (id: number) => {
        let res = await GetSlaTypeBySla(id);
            console.log(res);
            if (res) {
                setSlaTypeNumber(res);
            }
    }
    const getSlaType = async () => {
        let res = await ListSlaTypes();
        console.log(res);
        if (res) {
            setSlaType(res);
        }
    }
    React.useEffect(() => {
        // console.log("slug");
        // console.log(slug);
        getContract(slug)
        getServiceCatalog();
        getSlaType();
    }, []);
    React.useEffect(() => {
        getSlaByType(slaTypeNumber);
    }, [slaTypeNumber]);
    const handleInputChangeSlaType = (event: SelectChangeEvent<number>) => {
        setSlaTypeNumber(Number(event.target.value)); // Ensure value is converted to a number
    };

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const submit = async () => {
        // console.log(customer)
        try {
            contract.ContractStart = contractStart.format("YYYY-MM-DD").toString()
            contract.ContractStop = contractStop.format("YYYY-MM-DD").toString()
           // Calculate notice dates
           let noticeDate1 = contractStop.clone().subtract(90, 'days');
           let noticeDate2 = contractStop.clone().subtract(60, 'days');
           let noticeDate3 = contractStop.clone().subtract(30, 'days');

           // Set the notice dates in the contract object
           contract.NoticeDate1 = noticeDate1.format("YYYY-MM-DD");
           contract.NoticeDate2 = noticeDate2.format("YYYY-MM-DD");
           contract.NoticeDate3 = noticeDate3.format("YYYY-MM-DD");
            if (contract.IncidentPerContract != null) {
                contract.IncidentPerContract = contract.IncidentPerContract * 1
            }
            if (contract.IncidentPerYear != null) {
                contract.IncidentPerYear = contract.IncidentPerYear * 1
            }
            contract.Cost = typeof contract.Cost == "string" ? parseFloat(contract.Cost) : 0.0
            contract.SlaID = convertType(contract.SlaID)
            contract.ServiceCatalogID = convertType(contract.ServiceCatalogID)
            let res = await UpdateContract(contract)
            if (res && res.Status !== "error") {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
            } else {
                setAlertMessage(res?.Message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                setError(true);
            }

            // setTimeout(() => {
            //     router.push("/contract")
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
        const id = event.target.id as keyof typeof ContractUpdate;

        const { value } = event.target;

        setContract({ ...contract, [id]: value });
    };

    const handleChangeNumber = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof contract;
        setContract({
            ...contract,
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
                    // style={{ backgroundColor: "#f8f9fa" }}
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
                            title={`สัญญาโปรเจค ${contract.ProjectName || ""}`}
                        ></CardHeader>
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
                    <Container maxWidth="lg">


                    <div className="flex flex-col h-screen">
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Project Name</p>

                                        <TextField
                                            id="ProjectName"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={contract.ProjectName || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Cost</p>

                                        <TextField
                                            id="Cost"
                                            variant="outlined"
                                            type="number"
                                            size="medium"
                                            value={contract.Cost || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Customer Po Number</p>

                                        <TextField
                                            id="CustomerPO"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={contract.CustomerPO || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            inputProps={{ maxLength: 13 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Vendor PO Number</p>

                                        <TextField
                                            id="VendorPO"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={contract.VendorPO || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            inputProps={{ maxLength: 13 }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Contract Start</p>

                                        <DatePicker
                                            value={contractStart}
                                            views={["day", "month", "year"]}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setContractStart(newValue)
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Contract Stop</p>

                                        <DatePicker
                                            value={contractStop}
                                            views={["day", "month", "year"]}
                                            onChange={(newValue: any) => {
                                                if (newValue !== null && newValue != undefined) {
                                                    setContractStop(newValue)
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Incident Per Year</p>

                                        <TextField
                                            id="IncidentPerYear"
                                            variant="outlined"
                                            type="number"
                                            size="medium"
                                            value={contract.IncidentPerYear || ""}
                                            onChange={handleInputChange}

                                            style={{ color: "black" }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Incident Per Contract</p>
                                        <TextField
                                            id="IncidentPerContract"
                                            variant="outlined"
                                            type="number"
                                            size="medium"
                                            value={contract.IncidentPerContract || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Scope of Work Link</p>

                                        <TextField
                                            id="ScopeOfWorkURL"
                                            variant="outlined"
                                            type="string"
                                            size="medium"
                                            value={contract.ScopeOfWorkURL || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>Service Catalog</p>
                                        <Select
                                            native
                                            value={contract.ServiceCatalogID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "ServiceCatalogID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ Service Catalog
                                            </option>
                                            {service_catalog.map((item: ServiceCatalogInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>SLA type</p>
                                        <Select
                                            native
                                            value={slaTypeNumber ?? 1}
                                            onChange={handleInputChangeSlaType}
                                            // inputProps={{
                                            //     name: "SlaID",
                                            // }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ sla type
                                            </option>
                                            {slaType.map((item: SlaTypeInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Type}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <p style={{ color: "black" }}>SLA</p>
                                        <Select
                                            native
                                            value={contract.SlaID ?? 0}
                                            onChange={handleChangeNumber}
                                            inputProps={{
                                                name: "SlaID",
                                            }}
                                        >
                                            <option value={0} key={0}>
                                                กรุณา เลือกชนิดของ sla
                                            </option>
                                            {sla.map((item: SlaInterface) => (
                                                <option key={item.Id} value={item.Id}>{item.Response}</option>
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
                                            value={contract.Description || ""}
                                            onChange={handleInputChange}
                                            style={{ color: "black" }}
                                            rows={1}
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