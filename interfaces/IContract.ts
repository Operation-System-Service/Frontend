import { internal_resolveProps } from "@mui/utils";
import { CustomerInterface } from "./ICustomer";
import { EmployeeInterface } from "./IEmployee";
import { ServiceCatalogInterface } from "./IServiceCatalog";
import { SlaInterface } from "./ISla";
import { ListOperationServiceInterface } from "./IOperationService";

export interface ContractCreateInterface {
  ContractStart?: string;
  ContractStop?: string;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  Cost?: number;
  OverAllIncident?: number;
  Description?: string;
  NoticeDate1?: string;
  NoticeDate2?: string;
  NoticeDate3?: string;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  ServiceCatalogID?: number;
  SlaID?: number;
  CustomerID?: string;
  EmployeeCreatedID?: string;
}

export interface ContractUpdateInterface {
  Id: string;
  ContractStart?: string;
  ContractStop?: string;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  OverAllIncident?: number;
  Cost?: number;
  Description?: string;
  NoticeDate1?: string;
  NoticeDate2?: string;
  NoticeDate3?: string;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  ServiceCatalogID?: number;
  SlaID?: number;
  CustomerID?: string;
  EmployeeCreatedID?: string;
}

export interface ContractInterface {
  Id: string;
  ContractStart?: Date;
  ContractStop?: Date;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  OverAllIncident?: number;
  Cost?: number;
  Description?: string;
  NoticeDate?: Date;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  OverAllIncidentPerYear?: number;

  ServiceCatalogID?: number;
  ServiceCatalog?: ServiceCatalogInterface;
  SlaID?: number;
  Sla?: SlaInterface;
  CustomerID?: string;
  Customer?: CustomerInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
}

export interface ContractHistoryInterface {
  HistoryID: string;
  ContractStart?: Date;
  ContractStop?: Date;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  OverAllIncident?: number;
  Cost?: number;
  Description?: string;
  NoticeDate?: Date;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  OverAllIncidentPerYear?: number;

  ServiceCatalogID?: number;
  ServiceCatalog?: ServiceCatalogInterface;
  SlaID?: number;
  Sla?: SlaInterface;
  CustomerID?: string;
  Customer?: CustomerInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
  ContractID?: string;
  Contract?: ContractInterface;
}

export interface DeviceInterface {
  Id?: string;
  Brand?: string;
  Model?: string;
  Serial?: string;
  License?: string;
  Sku?: string;
  StartLicenseDate?: Date;
  ExpiredLicenseDate?: Date;
  DistributerCompany?: string;
  DistributerContactPerson?: string;
  DistributerContactNumber?: string;
  DistributerContactEmail?: string;

  ContractID?: string;
  Contract?: ContractInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
}

export interface CreateDeviceInterface {
  Id?: string;
  Brand: string;
  Model: string;
  Serial: string;
  License?: string;
  Sku?: string;
  DistributerCompany?: string;
  DistributerContactPerson?: string;
  DistributerContactNumber?: string;
  DistributerContactEmail?: string;
  StartLicenseDate?: string;
  ExpiredLicenseDate?: string;
  ContractID?: string;
}

export interface SoftwareInterface {
  Id?: string;
  Brand?: string;
  Model?: string;
  Quantity?: number;
  License?: string;
  Sku?: string;
  DistributerCompany?: string;
  DistributerContactPerson?: string;
  DistributerContactNumber?: string;
  DistributerContactEmail?: string;
  StartLicenseDate?: Date;
  ExpiredLicenseDate?: Date;

  ContractID?: string;
  Contract?: ContractInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
}

export interface CreateSoftwareInterface {
  Id?: string;
  Brand?: string;
  Model?: string;
  Quantity?: number;
  License?: string;
  Sku?: string;
  DistributerCompany?: string;
  DistributerContactPerson?: string;
  DistributerContactNumber?: string;
  DistributerContactEmail?: string;
  StartLicenseDate?: string;
  ExpiredLicenseDate?: string;
  ContractID?: string;
}

export interface CreateDeviceConfigBackupInterface {
  Id?: string;
  Note?: string;
  FilePath?: string;
  DeviceID?: string;
  OperationServiceID?: string;
}
export interface DeviceConfigBackupInterface {
  Id?: string;
  Note?: string;
  FilePath?: string;
  DeviceID?: string;
  Device?: DeviceInterface;
  OperationServiceID?: string;
  OperationService?: ListOperationServiceInterface;
}


export interface CreateSoftwareConfigBackupInterface {
  Id?: string;
  Note?: string;
  FilePath?: string;
  SoftwareID?: string;
  OperationServiceID?: string;
}
export interface SoftwareConfigBackupInterface {
  Id?: string;
  Note?: string;
  FilePath?: string;
  SoftwareID?: string;
  Software?: SoftwareInterface;
  OperationServiceID?: string;
  OperationService?: ListOperationServiceInterface;
}
