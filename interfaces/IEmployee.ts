import { DivisionInterface } from "./IDivision";
import { RoleInterface } from "./IRole";
export interface EmployeeInterface {
  Id: string;
  Name?: string;

  Phone?: string;
  LineID?: string;
  Email?: string;
  StartDate: Date;
  ProbationDate: Date;
  TerminationDate: Date;
  UpdateDate: Date;
  CreateDate: Date;

  RoleID?: number;
  DivisionID?: number;
  EmployeeCreatedID: string;
  SupervisorID: string;

  EmployeeCreated?: EmployeeInterface;
  Supervisor?: EmployeeInterface;
  Role?: RoleInterface;
  Division?: DivisionInterface;
}

export interface EmployeeCreateInterface {
  Name?: string;

  Phone?: string;
  LineID?: string;
  Email?: string;
  StartDate: string;
  ProbationDate?: string;
  TerminationDate?: string;

  RoleID?: number;
  DivisionID?: number;
  EmployeeCreatedID: string;
  SupervisorID: string;
}

export interface EmployeeUpdateInterface {
  Id: string;
  Name?: string;

  Phone?: string;
  LineID?: string;
  Email?: string;
  StartDate: string;
  ProbationDate?: string;
  TerminationDate?: string;

  RoleID?: number;
  DivisionID?: number;
  EmployeeCreatedID: string;
  SupervisorID: string;
}
