export class Utils {
    static IsExist(key: any): boolean {
        const res = JSON.parse(sessionStorage.getItem(key));
        return res === null || res === undefined || res === 'undefined';
    }

    static getItem(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
    }
}
