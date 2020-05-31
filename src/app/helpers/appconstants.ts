import { environment } from 'src/environments/environment';
export class Appconstants {
    public static get baseAPIURL(): string {
        if (environment.apiBaseHost === 'API_BASE_PORT' || environment.apiBasePort === 'API_BASE_HOST') {
            return 'http://localhost:8080/api/';
        }
        return 'http://'.concat(environment.apiBaseHost).concat(':').concat(environment.apiBasePort).concat('/api/');
    }

}
