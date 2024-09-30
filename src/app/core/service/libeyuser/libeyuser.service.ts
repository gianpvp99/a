import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LibeyUserRequest, LibeyUserResponse } from "src/app/entities/libeyuser";
@Injectable({
	providedIn: "root",
})
export class LibeyUserService {
	constructor(private http: HttpClient) {}
	Find(documentNumber: string): Observable<LibeyUserResponse> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/${documentNumber}`;
		return this.http.get<LibeyUserResponse>(uri);
	}

	GetAll(): Observable<LibeyUserResponse> {
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/GetAll`;
		return this.http.get<LibeyUserResponse>(uri);
	}

	Create(data: LibeyUserRequest): Observable<LibeyUserResponse>{
		const uri = `${environment.pathLibeyTechnicalTest}LibeyUser/Create`;
		return this.http.post<LibeyUserResponse>(uri,data);
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