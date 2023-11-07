export namespace train {
	
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

