import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiPadronService } from "../../domain/interface/api-padron.service";
import fs from 'fs';
import path from 'path';
import { ErrorManager } from "src/utils/errors/error.manager";
import { JwtService } from "@nestjs/jwt";
import * as https from 'https';
import axios from "axios";
import { getKeyByValue } from "src/utils/functions/generic-functions";
import { IIEEPadronDto } from "../dto/iiee-padron.dto";
import { parseXmlToJson, transformResponse } from "src/utils/functions/xml2json";

@Injectable()
export class ApiPadronImplService implements ApiPadronService {
    

    constructor(private jwtService: JwtService) { }

    async getInfoIeByModularCode(modularCode: string, anexo: string) {
        const token = await this.generateBearerToken();

        try{
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                data: 
                {   
                    codigo_modular: modularCode,
                    anexo: anexo
                }
            };

            const response = await axios.get(`${process.env.API_PADRON_URL}/siagie-materiales/ObtenerPadron`, requestConfig);
            //console.log(response);
            return response.data;

        }catch(error){
            console.log(error);
            if (error.code == 'ECONNREFUSED'){
                throw ErrorManager.createSignatureError(`SERVICE_UNAVAILABLE :: Failed to connect to microservice 'api-padron' on port ${error.port}`);
            }
            
            if (error.response.data){
                throw ErrorManager.createSignatureError(`${getKeyByValue(HttpStatus,error.response.status)} :: ${error.response.data.message}`);
            }

            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async listIIEEByDREAndUgel(dreCode: string, ugelCode: string, ieDto: IIEEPadronDto) {
        const token = await this.generateBearerToken();

        try {
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                data: 
                {   ...ieDto,
                    codigoDRE: dreCode,
                    codigoUGEL: ugelCode
                }
            };

            const response = await axios.get(`${process.env.API_PADRON_URL}/siagie-materiales/ObtenerXMLPadron`,requestConfig);
            //console.log(response);
            if(!response.data.success){
                response.data.data = [];
                return response.data;
            }
            //console.log(response);
            const transformXml = await parseXmlToJson(response.data.data);
            const translatedResp = transformResponse(transformXml);
            
            response.data.data = translatedResp;
            //console.log(translatedResp);
            //console.log(response);
            

            return response.data;

        } catch (error) {
            console.log(error);
            if (error.code == 'ECONNREFUSED'){
                throw ErrorManager.createSignatureError(`SERVICE_UNAVAILABLE :: Failed to connect to microservice 'api-padron' on port ${error.port}`);
            }
            
            if (error.response.data){
                throw ErrorManager.createSignatureError(`${getKeyByValue(HttpStatus,error.response.status)} :: ${error.response.data.message}`);
            }

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async generateBearerToken(): Promise<string> {
        const payload = {
            agw: process.env.PAYLOAD_AGW_KEY,
            exp: Math.round(
                (new Date().getTime() / 1000)
                + Number(process.env.PAYLOAD_EXP_TIME),
            ),
        };

        return await this.jwtService.signAsync(payload);
    }

    async listAllDRE() {
        const token = await this.generateBearerToken();
        //console.log(token);
        try {
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            };

            const response = await axios.get(`${process.env.API_PADRON_URL}/obtenerDreUgel`, requestConfig);
            //console.log(response);
            return response.data;

        } catch (error) {
            
            if (error.code == 'ECONNREFUSED'){
                throw ErrorManager.createSignatureError(`SERVICE_UNAVAILABLE :: Failed to connect to microservice 'api-padron' on port ${error.port}`);
            }
            
            if (error.response.data){
                throw ErrorManager.createSignatureError(`${getKeyByValue(HttpStatus,error.response.status)} :: ${error.response.data.message}`);
            }

            throw ErrorManager.createSignatureError(error.message)
        }
        //console.log(token);
        //throw new Error("Method not implemented.");
    }

    async listAllUGELByDRECode(dreCode: string) {
        const token = await this.generateBearerToken();
        try {
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            };

            const response = await axios.get(`${process.env.API_PADRON_URL}/obtenerDreUgel/${dreCode}`, requestConfig);
            //console.log(response);
            return response.data;

        } catch (error) {
            
            if (error.code == 'ECONNREFUSED'){
                throw ErrorManager.createSignatureError(`SERVICE_UNAVAILABLE :: Failed to connect to microservice 'api-padron' on port ${error.port}`);
            }
            
            if (error.response.data){
                throw ErrorManager.createSignatureError(`${getKeyByValue(HttpStatus,error.response.status)} :: ${error.response.data.message}`);
            }

            throw ErrorManager.createSignatureError(error.message)
        }
    }

}