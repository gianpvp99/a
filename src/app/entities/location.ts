export interface Region{
    RegionCode: string;
    RegionDescription: string
}

export interface Province{
    ProvinceCode: string;
    RegionCode: string
    ProvinceDescription: string;
}

export interface Ubigeo{
    UbigeoCode: string;
    ProvinceCode: string;
    RegionCode: string;
    UbigeoDescription: string
}