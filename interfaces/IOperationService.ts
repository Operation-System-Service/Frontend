import { ContractInterface } from "./IContract";
import { EmployeeInterface } from "./IEmployee";
import { OperationTypeInterface } from "./IOperationType";
import { PriorityInterface } from "./IPriority";
import { StatusInterface } from "./IStatus";

export interface DivisionInterface {
  Id?: number;
  Name?: string;
}

export interface CreateOperationServiceInterface {
  OperationSubject?: string;
  OperationSiteName?: string;
  OperationSiteAddress?: string;
  OperationSiteGoogleMap?: string;
  Description?: string;
  DateOfVisit?: string;

  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;
  ScopeOfWorkURL?: string;

  StatusID?: number;
  PriorityID?: number;
  ContractID?: string;
  EmployeeCreatedID?: string;
  JuniorEmployeeResponsibleID?: string;
  SeniorEmployeeResponsibleID?: string;
  SupervisorEmployeeResponsibleID?: string;
  OperationTypeID?: number;
}

export interface UpdateOperationServiceInterface {
  Id?: string;
  OperationSubject?: string;
  OperationSiteName?: string;
  OperationSiteAddress?: string;
  OperationSiteGoogleMap?: string;
  Description?: string;
  DateOfVisit?: string;
  ScopeOfWorkURL?: string;
  OperationNumber?: string;

  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;

  StatusID?: number;
  PriorityID?: number;
  ContractID?: string;
  EmployeeCreatedID?: string;
  JuniorEmployeeResponsibleID?: string;
  SeniorEmployeeResponsibleID?: string;
  SupervisorEmployeeResponsibleID?: string;
  OperationTypeID?: number;
}

export interface ListOperationServiceInterface {
  Id: string;
  OperationSubject?: string;
  OperationSiteName?: string;
  OperationSiteAddress?: string;
  OperationSiteGoogleMap?: string;
  Description?: string;
  DateOfVisit?: Date;
  ScopeOfWorkURL?: string;
  OperationNumber?: string;

  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;

  StatusID?: number;
  Status?: StatusInterface;
  PriorityID?: number;
  Priority?: PriorityInterface;
  ContractID?: string;
  Contract?: ContractInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
  JuniorEmployeeResponsibleID?: string;
  JuniorEmployeeResponsible?: EmployeeInterface;
  SeniorEmployeeResponsibleID?: string;
  SeniorEmployeeResponsible?: EmployeeInterface;
  SupervisorEmployeeResponsibleID?: string;
  SupervisorEmployeeResponsible?: EmployeeInterface;
  OperationTypeID?: number;
  OperationType?: OperationTypeInterface;
}
export interface ListOperationServiceHistoryInterface {
  Id: string;
  OperationSubject?: string;
  OperationSiteName?: string;
  OperationSiteAddress?: string;
  OperationSiteGoogleMap?: string;
  Description?: string;
  DateOfVisit?: Date;
  ScopeOfWorkURL?: string;

  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;

  StatusID?: number;
  Status?: StatusInterface;
  PriorityID?: number;
  Priority?: PriorityInterface;
  ContractID?: string;
  Contract?: ContractInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
  EmployeeUpdatedID?: string;
  EmployeeUpdated?: EmployeeInterface;
  JuniorEmployeeResponsibleID?: string;
  JuniorEmployeeResponsible?: EmployeeInterface;
  SeniorEmployeeResponsibleID?: string;
  SeniorEmployeeResponsible?: EmployeeInterface;
  SupervisorEmployeeResponsibleID?: string;
  SupervisorEmployeeResponsible?: EmployeeInterface;
  OperationTypeID?: number;
  OperationType?: OperationTypeInterface;
  OperationId?: string;
  Operation?: ListOperationServiceInterface;

  UpdateDate?:Date;
}