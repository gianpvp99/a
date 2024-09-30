export interface LibeyUserResponse{
    documentNumber:string;
    documentTypeId:number;
    name:string;
    fathersLastName :string;
    mothersLastName :string;
    address :string;
    regionCode :string;
    provinceCode :string;       
    ubigeoCode :string;
    phone :string;
    email :string;
    password :string;
    active :boolean;
}

export interface LibeyUserRequest{
    DocumentNumber:string;
    DocumentTypeId:number;
    Name:string;
    FathersLastName :string;
    MothersLastName :string;
    Address :string;
    UbigeoCode :string;
    Phone :string;
    Email :string;
    Password :string;
    Active :boolean;
}