import { IIEEPadronDto } from "../../application/dto/iiee-padron.dto";

export interface ApiPadronService {
    generateBearerToken(): Promise<string>;
    listAllDRE();
    listAllUGELByDRECode(dreCode: string);
    listIIEEByDREAndUgel(dreCode: string, ugelCode: string, ieDto: IIEEPadronDto);
}