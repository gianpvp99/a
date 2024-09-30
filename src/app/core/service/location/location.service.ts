import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Province, Region, Ubigeo } from "src/app/entities/location";
@Injectable({
	providedIn: "root",
})
export class LocationService {
	constructor(private http: HttpClient) {}

	ListRegion():Observable<Region>{
        const uri = `${environment.pathLibeyTechnicalTest}Location/Region/GetAll`
        return this.http.get<Region>(uri);
    }

    ListProvince(region: string):Observable<Province>{
        const uri = `${environment.pathLibeyTechnicalTest}Location/Province/List?region=${region}`
        return this.http.get<Province>(uri);
    }
    
    ListUbigeo(region:string, province: string):Observable<Ubigeo>{
        const uri = `${environment.pathLibeyTechnicalTest}Location/Ubigeo/List?region=${region}&province=${province}`
        return this.http.get<Ubigeo>(uri);
    }

    ListUbigeoForUser(ubigeo: string):Observable<Ubigeo>{
        const uri = `${environment.pathLibeyTechnicalTest}Location/Ubigeo/ListForUser?ubigeo=${ubigeo}`
        return this.http.get<Ubigeo>(uri);
    }
}