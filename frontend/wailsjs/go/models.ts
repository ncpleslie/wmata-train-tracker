export namespace train {
	
	export class Incident {
	    // Go type: WmataTime
	    dateUpdated: any;
	    description: string;
	    incidentId: string;
	    incidentType: string;
	    linesAffected: string[];
	
	    static createFrom(source: any = {}) {
	        return new Incident(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dateUpdated = this.convertValues(source["dateUpdated"], null);
	        this.description = source["description"];
	        this.incidentId = source["incidentId"];
	        this.incidentType = source["incidentType"];
	        this.linesAffected = source["linesAffected"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class IncidentsResponse {
	    incidents: Incident[];
	
	    static createFrom(source: any = {}) {
	        return new IncidentsResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.incidents = this.convertValues(source["incidents"], Incident);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class StationAddress {
	    street: string;
	    city: string;
	    state: string;
	    zip: string;
	
	    static createFrom(source: any = {}) {
	        return new StationAddress(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.street = source["street"];
	        this.city = source["city"];
	        this.state = source["state"];
	        this.zip = source["zip"];
	    }
	}
	export class Station {
	    code: string;
	    name: string;
	    stationTogether1: string;
	    stationTogether2: string;
	    lineCode1?: string;
	    lineCode2?: string;
	    lineCode3?: string;
	    lineCode4?: string;
	    lat: number;
	    lon: number;
	    address: StationAddress;
	
	    static createFrom(source: any = {}) {
	        return new Station(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.name = source["name"];
	        this.stationTogether1 = source["stationTogether1"];
	        this.stationTogether2 = source["stationTogether2"];
	        this.lineCode1 = source["lineCode1"];
	        this.lineCode2 = source["lineCode2"];
	        this.lineCode3 = source["lineCode3"];
	        this.lineCode4 = source["lineCode4"];
	        this.lat = source["lat"];
	        this.lon = source["lon"];
	        this.address = this.convertValues(source["address"], StationAddress);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class Train {
	    car?: string;
	    destination: string;
	    destinationCode?: string;
	    destinationName: string;
	    group: string;
	    line: string;
	    locationCode: string;
	    locationName: string;
	    min: string;
	    seconds?: string;
	    serviceType?: string;
	    trainId?: string;
	
	    static createFrom(source: any = {}) {
	        return new Train(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.car = source["car"];
	        this.destination = source["destination"];
	        this.destinationCode = source["destinationCode"];
	        this.destinationName = source["destinationName"];
	        this.group = source["group"];
	        this.line = source["line"];
	        this.locationCode = source["locationCode"];
	        this.locationName = source["locationName"];
	        this.min = source["min"];
	        this.seconds = source["seconds"];
	        this.serviceType = source["serviceType"];
	        this.trainId = source["trainId"];
	    }
	}
	export class TrainsResponse {
	    trains: Train[];
	    // Go type: time
	    lastUpdated: any;
	
	    static createFrom(source: any = {}) {
	        return new TrainsResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.trains = this.convertValues(source["trains"], Train);
	        this.lastUpdated = this.convertValues(source["lastUpdated"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

