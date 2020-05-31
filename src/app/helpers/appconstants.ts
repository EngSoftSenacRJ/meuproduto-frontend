import { environment } from 'src/environments/environment';
export class Appconstants {
    public static get baseAPIURL(): string {
        return 'http://'.concat(environment.apiBaseHost).concat(':').concat(environment.apiBasePort).concat('/api/');
    }
}
