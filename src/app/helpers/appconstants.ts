import { environment } from 'src/environments/environment';
export class Appconstants {
    public static get baseAPIURL(): string {
        /*
        if (environment.apiBaseHost === 'API_BASE_HOST') {
            return 'http://localhost:8080/api/';
        }
        
        return 'http://'.concat(environment.apiBaseHost).concat(':8080').concat('/api/');
       */ 
       return 'http://18.218.14.149:8080/api/';
    }

    public static get baseSearchAPIURL(): string {
        /*
        if (environment.apiBaseHost === 'API_BASE_HOST') {
            return 'http://localhost:8082/searchapi/';
        }
<<<<<<< HEAD
        return 'http://'.concat(environment.apiBaseHost).concat(':').concat(environment.apiBasePort).concat('/searchapi/');
=======
        
        return 'http://'.concat(environment.apiBaseHost).concat(':8082').concat('/searchapi/');
        */
       return 'http://18.218.14.149:8082/searchapi/';
>>>>>>> da586e77f35dc7d9981aa0bf1bf0397a02c94ad0
    }

}
