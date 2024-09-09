export interface CustomerInterface {
  Id: string;
  CompanyName?: string;

  Description?: string;
  TaxNumber?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  CustomerGroupId?: number;
  CustomerGroup: CustomerGroupInterface;
  EmployeeCreatedID?: string;
}
export interface CustomerCreateInterface {
  CompanyName?: string;
  Description?: string;
  TaxNumber?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  CustomerGroupId?: number;
  EmployeeCreatedID?: string;
}
export interface CustomerAddressInterface {
  Id: number;
  SiteName?: string;
  Address?: string;
  GoogleMapURL?: string;
  Description?: string;
  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;
  CustomerID: string;
	Customer:CustomerInterface;
}
export interface CreateCustomerAddressInterface {
  SiteName?: string;
  Address?: string;
  GoogleMapURL?: string;
  Description?: string;
  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;
  CustomerID: string;
}
export interface CustomerGroupInterface {
  Id: number;
  Name?: string;
  Description?: string;
}
export interface CreateCustomerGroupInterface {
  Name?: string;
  Description?: string;
}

