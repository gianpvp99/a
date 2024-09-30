import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { DocumentType } from 'src/app/entities/documentType';
import { DocumentTypeService } from 'src/app/core/service/documentType/documentType.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/service/location/location.service';
import { Province, Region, Ubigeo } from 'src/app/entities/location';
import { LibeyUserService } from 'src/app/core/service/libeyuser/libeyuser.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-usermaintenance',
  templateUrl: './usermaintenance.component.html',
  styleUrls: ['./usermaintenance.component.css']
})
export class UsermaintenanceComponent implements OnInit {
  public userMaintenanceForm!: FormGroup;

  public rowsDocumentType: DocumentType[] = [];
  public selectedDocumentType: number = 0;
  public rowsRegion: Region[] = [];
  public selectedRegion: string = "";
  public rowsProvince: Province[] = [];
  public selectedProvince: string = "";
  public rowsUbigeo: Ubigeo[] = [];
  public selectedUbigeo: string = "";

  public params:any = {};
  public maintenanceCreateOrUpdate = "";

  get FControls():{ [p: string]: AbstractControl } {
    return this.userMaintenanceForm.controls;
  }
  constructor(
    private _formBuilder:FormBuilder,
    private _documentTypeService:DocumentTypeService,
    private _locationService:LocationService,
    private _libeyUserService:LibeyUserService,
    private _router:ActivatedRoute,
    private _link:Router) { 
      this.userMaintenanceForm = this._formBuilder.group({
        DocumentNumber: ['', [Validators.required]],
        // DocumentTypeId: [this.selectedDocumentType, [Validators.required]],
        Name: ['', [Validators.required]],
        FathersLastName: ['', [Validators.required]],
        MothersLastName: ['', Validators.required],
        Address: ['', Validators.required],
        // UbigeoCode: [this.selectedUbigeo, Validators.required],
        Phone: ['', Validators.required],
        Email: ['',Validators.required],
        Password: ['', Validators.required],
        Active: [true]
      });
    }
  ngOnInit(): void {
    this.ListDocumentType();
    this.ListRegion();
    this._router.queryParams.subscribe(params => {
      this.params.documentNumber = params['documentNumber'];
      this.params.documentTypeId = params['documentTypeId'];
      this.params.name = params['name'];
      this.params.fathersLastName = params['fathersLastName'];
      this.params.mothersLastName = params['mothersLastName'];
      this.params.address = params['address'];
      this.params.regionCode = params['regionCode'];
      this.params.provinceCode = params['provinceCode'];
      this.params.ubigeoCode = params['ubigeoCode'];
      this.params.phone = params['phone'];
      this.params.email = params['email'];
      this.params.password = params['password'];
      this.params.active = params['active'];
      console.log(this.params);
      if(this.params.documentNumber == undefined){ // Registrar
        this.maintenanceCreateOrUpdate = "Registrar"
      }else { //Editar
        this.maintenanceCreateOrUpdate = "Editar";

        this.FControls['DocumentNumber'].setValue(this.params.documentNumber);
        this.selectedDocumentType = Number(this.params.documentTypeId);
        this.FControls['Name'].setValue(this.params.name);
        this.FControls['FathersLastName'].setValue(this.params.fathersLastName);
        this.FControls['MothersLastName'].setValue(this.params.mothersLastName);
        this.FControls['Address'].setValue(this.params.address);
        this.FControls['Phone'].setValue(this.params.phone);
        this.FControls['Email'].setValue(this.params.email);
        this.FControls['Password'].setValue(this.params.password);
        this.FControls['Active'].setValue(this.params.active);
        this.selectedUbigeo = this.params.ubigeoCode;
        this.ListUbigeoForUser();
      }
    });
    console.log(this.selectedDocumentType)

    // this.selectedDocumentType = 2
  }

  ListDocumentType(){
    this._documentTypeService.List().subscribe(
      (res:any)=>{
        this.rowsDocumentType = res;
        // this.selectedDocumentType = res[0].documentTypeId;
      },(error:any)=>{
        console.error(error)
      });
  }

  ListRegion(){
    this._locationService.ListRegion().subscribe(
      (res:any)=>{
        this.rowsRegion = res;
        this.selectedRegion = res[0].regionCode;
      },(error:any)=>{
        console.error(error);
      });
  }

  ChangeRegion(){
    this.ListProvince();
  }

  ListProvince(): void{
    this._locationService.ListProvince(this.selectedRegion).subscribe(
      (res:any)=>{
        this.rowsProvince = res;
      },(error:any)=>{
        console.error(error);
      });
  }
  ChangeProvince(): void{
    this.ListUbigeo();
  }
  ListUbigeo(): void{
    this._locationService.ListUbigeo(this.selectedRegion, this.selectedProvince).subscribe(
      (res:any)=>{
        this.rowsUbigeo = res;
        this.selectedUbigeo = res[0].ubigeoCode;
      },(error:any)=>{
        console.error(error);
      });
  }
  Submit(){
    if(this.userMaintenanceForm.invalid){
      return
    }

    if(this.maintenanceCreateOrUpdate == "Registrar"){
      this._libeyUserService.Create({
        DocumentNumber: this.FControls['DocumentNumber'].value,
        DocumentTypeId: this.selectedDocumentType,
        Name: this.FControls['Name'].value,
        FathersLastName: this.FControls['FathersLastName'].value,
        MothersLastName: this.FControls['MothersLastName'].value,
        Address: this.FControls['Address'].value,
        UbigeoCode: this.selectedUbigeo,
        Phone: this.FControls['Phone'].value,
        Email: this.FControls['Email'].value,
        Password: this.FControls['Password'].value,
        Active: this.FControls['Active'].value
      }).subscribe(
        (res:any)=>{
          swal.fire({
            title: `${res.message}`,
            text: "El usuario se registro!",
            icon: "success"
          });
        },(error:any)=>{
          console.error(error);
        });
    }
    else if(this.maintenanceCreateOrUpdate == "Editar"){
      this._libeyUserService.Update({
        DocumentNumber: this.FControls['DocumentNumber'].value,
        DocumentTypeId: this.selectedDocumentType,
        Name: this.FControls['Name'].value,
        FathersLastName: this.FControls['FathersLastName'].value,
        MothersLastName: this.FControls['MothersLastName'].value,
        Address: this.FControls['Address'].value,
        UbigeoCode: this.selectedUbigeo,
        Phone: this.FControls['Phone'].value,
        Email: this.FControls['Email'].value,
        Password: this.FControls['Password'].value,
        Active: this.FControls['Active'].value
      }).subscribe(
        (res:any)=>{
          swal.fire({
            title: `${res.message}`,
            text: "El usuario se actualizó!",
            icon: "success"
          });

          
        },(error:any)=>{
          swal.fire({
            icon: "error",
            title: "Error",
            text: "Error en el servidor!",
          });
          console.error(error);
        })
    }

    this._link.navigate(['/user/card'], {
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
   
  }

  cleanUser(){
    this.selectedProvince = "";
    this.selectedUbigeo = "";
    this.ListRegion();
    this.rowsProvince = [];
    this.rowsUbigeo = [];
    this.FControls['DocumentNumber'].setValue('');
    this.FControls['Name'].setValue('');
    this.FControls['FathersLastName'].setValue('');
    this.FControls['MothersLastName'].setValue('');
    this.FControls['Address'].setValue('');
    // this.FControls['regionCode'].setValue(this.params.regionCode);
    // this.FControls['provinceCode'].setValue(this.params.provinceCode);
    this.FControls['Phone'].setValue('');
    this.FControls['Email'].setValue('');
    this.FControls['Password'].setValue('');
    this.FControls['Active'].setValue('');
  }

  ListUbigeoForUser(){
    this._locationService.ListUbigeoForUser(this.selectedUbigeo).subscribe(
      (res:any)=>{
        this.selectedRegion = res[0].regionCode;
        this.ListProvince();
        this.selectedProvince = res[0].provinceCode;
        this.ListUbigeo();
        this.selectedUbigeo = res[0].ubigeoCode;
      },(error:any)=>{
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el servidor!",
        })
        console.error(error);
      })
  }
}