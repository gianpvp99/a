import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LibeyUserService } from "src/app/core/service/libeyuser/libeyuser.service";
import { LibeyUserResponse } from "src/app/entities/libeyuser";
import swal from 'sweetalert2';

@Component({
	selector: "app-usercards",
	templateUrl: "./usercards.component.html",
	styleUrls: ["./usercards.component.css"],
})
export class UsercardsComponent implements OnInit {
	public rowsUsers:LibeyUserResponse[] = [];
	public documentNumber:string = "";
	constructor( 
		private _libeyUserService: LibeyUserService,
		private _router:Router) {}
	ngOnInit(): void {
		
		this.ListUsers();
	}

	Find(){
		console.log(this.documentNumber);
		if(this.documentNumber.trim() == "" || this.documentNumber.trim() == null || this.documentNumber.trim() == undefined){
			this.ListUsers();
		}
		this._libeyUserService.Find(this.documentNumber.trim()).subscribe((res:any) => {
			this.rowsUsers = [];
			this.rowsUsers[0] = res;
			console.log(res);
		},(error:any)=>{
			console.error(error);
		});
	}
	ListUsers(){
		this._libeyUserService.GetAll().subscribe(
			(res:any)=>{
				this.rowsUsers = res;
				console.log(res);
			},(error:any)=>{
				console.error(error);
			});
	}

	EditUser(row: LibeyUserResponse){
		this._router.navigate(['/user/maintenance'], {
			queryParams: {
				documentNumber:row.documentNumber,
				documentTypeId:row.documentTypeId,
				name:row.name,
				fathersLastName :row.fathersLastName,
				mothersLastName :row.mothersLastName,
				address :row.address,
				regionCode :row.regionCode,
				provinceCode :row.provinceCode, 
				ubigeoCode :row.ubigeoCode,
				phone :row.phone,
				email :row.email,
				password :row.password,
				active :row.active
			},
			queryParamsHandling: 'merge',
			skipLocationChange: true
		});
		setTimeout(() => {
			// this.modalService.open(modal, {
			//   scrollable: true,
			//   size: 'lg',
			//   centered: true,
			//   beforeDismiss: () => {
			// 	return true;
			//   }
			// });
		  }, 0);
	}

	DeleteUser(documentNumber: string){
		swal.fire({
			title: 'Confirmación',
			text: '¿Desea eliminar este usuario?, esta acción no podrá revertirse',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
			customClass: {
			  confirmButton: 'btn btn-warning',
			  cancelButton: 'btn btn-primary'
			}
		  }).then(result => {
			if (result.value) {
				this._libeyUserService.Delete(documentNumber).subscribe(
					(res:any)=>{
						console.log(res);
						swal.fire({
							title: `${res.message}`,
							text: "El usuario se eliminó!",
							icon: "success"
							});
							this.ListUsers();
					},(error:any)=>{
						console.error(error);
					});
			}
		});
		
	}

	cleanList(){
		this.documentNumber = "";
		this.ListUsers();
	}
}