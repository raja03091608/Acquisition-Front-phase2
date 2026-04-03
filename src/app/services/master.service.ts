import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apiendpoints } from '../ApiEndPoints';

@Injectable({
  providedIn: 'root',
})
// export const BASE_URL = environment.apiUrl;
export class MasterService {
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCommands(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_COMMANDS}`);
  }

  getUnits(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_UNIT}`);
  }


  getUnitTypes(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_UNIT_TYPE}`);
  }



   getUIG(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_UIG}`);
  }
  getRefits(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_REFITS}`);
  }
  getCategory(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_CATEGORY}`);
  }
 getClasses(page: number = 1, pageSize: number = 10): Observable<any> {
  return this.http.get(
    `${this.BASE_URL}${Apiendpoints.MASTER_CLASS}?page=${page}&page_size=${pageSize}&order_column=name&order_type=asc`
  );
}

getGlobalSection(page:number){

  return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_GLOBAL_SECTION}?page=${page}`)
}

getGlobalSubSection(page:number){
  return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_GLOBAL_SUB_SECTION}?page=${page}`)
}



  getLocations(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_LOCATION}`);
  }
  getBoats(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.BOATS}`);
  }
  getAuthorityOptions(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.AUTHORITY}`);
  }

  getOverseeingTeamOptions(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.OVERSEEING_TEAM}`);
  }
  getPropulsionOptions(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.PROPULSION}`);
  }
  getCountries(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_COUNTRY}`);
  }
  getStates(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_STATE}`);
  }
  getStation(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_STATION}`);
  }

  getStatesByCountry(countryId: number | string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}${Apiendpoints.MASTER_STATE}?country=${countryId}`,
    );
  }
  getCitiesByStates(stateId: number | string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}${Apiendpoints.MASTER_CITY}?state=${stateId}`,
    );
  }
  getVessels(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_SHIP}`);
  }
  getShipsByClass(classId: number | string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}${Apiendpoints.MASTER_SHIP}?classofship=${classId}`,
    );
  }
   getShipsByCommandsAndClass(commandId : number , classId: number | string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}${Apiendpoints.MASTER_SHIP}?command=${commandId}&classofship=${classId}`,
    );
  }
  getCompartments(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_COMPARTMENT}`);
  }
  getModules(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_MODULE}`);
  }

  getSubModules(page: number = 1, pageSize: number = 10): Observable<any> {
  return this.http.get(
    `${this.BASE_URL}${Apiendpoints.MASTER_SUB_MODULE}?page=${page}&page_size=${pageSize}`
  );
}
  getContentType(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.CONTENT_TYPE}`);
  }
  getEngineOEM(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_ENGINE_OEM}`);
  }
  getBoatBuilder(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_BOAT_BUILDER}`);
  }
  getDockYards(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_DOCKYARD}`);
  }

   getStatus(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${Apiendpoints.MASTER_STATUS}`);
  }
  //
}
