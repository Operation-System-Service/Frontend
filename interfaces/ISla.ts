export interface SlaInterface {
    Id?: number;
    Response?: string;
    SlaTypeId?: number;
    SlaType?:SlaTypeInterface;
}
export interface SlaTypeInterface {
    Id?: number;
    Type?: string;
}