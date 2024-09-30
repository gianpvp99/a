import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LibeyUserRequest, LibeyUserResponse } from "src/app/entities/libeyuser";
@Injectable({
	providedIn: "root",
})
export class PrestamoService {
	constructor(private http: HttpClient) {}
	Find(documentNumber: string): Observable<LibeyUserResponse> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/${documentNumber}`;
		return this.http.get<LibeyUserResponse>(uri);
	}

	GetAll(): Observable<any> {
		const uri = `${environment.pathLibeyTechnicalTest}Prestamo/GetAllPrestamo`;
		return this.http.get<any>(uri);
	}

	Create(data: any): Observable<any>{
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/AddPrestamo`;
		return this.http.post<any>(uri,data);
	}

	Update(data: LibeyUserRequest): Observable<any>{
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/Update`;
		return this.http.post<any>(uri,data);
	}

	Delete(documentNumber: string): Observable<any> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/Delete?documentNumber=${documentNumber}`;
		return this.http.get<any>(uri);
	}
}