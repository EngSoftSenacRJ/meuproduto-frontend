import { environment } from 'src/environments/environment';
export class Appconstants {
    public static get baseAPIURL(): string {
        /*
        if (environment.apiBaseHost === 'API_BASE_PORT' || environment.apiBasePort === 'API_BASE_HOST') {
            return 'http://localhost:8080/api/';
        }
        
        return 'http://'.concat(environment.apiBaseHost).concat(':8080').concat('/api/');
        */
       return 'http://18.222.83.180:8080/api/';
    }

    public static get baseSearchAPIURL(): string {
        /*
        if (environment.apiBaseHost === 'API_BASE_PORT' || environment.apiBasePort === 'API_BASE_HOST') {
            return 'http://localhost:8082/searchapi/';
        }
        
        return 'http://'.concat(environment.apiBaseHost).concat(':8082').concat('/searchapi/');
        */
       return 'http://18.222.83.180:8082/searchapi/';
    }

}
