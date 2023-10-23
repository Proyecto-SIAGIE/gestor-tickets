import { HttpStatus, Injectable } from "@nestjs/common";
import * as svgCaptcha from 'svg-captcha'
import { CaptchaValidateDTO } from "./captcha-validate.dto";
import * as CryptoJS from 'crypto-js'
import { ErrorManager } from "src/utils/errors/error.manager";
import { IGenericResponse } from "src/utils/generic";

@Injectable()
export class CaptchaService {

    async generate() {

        try {
            const options = {
                width: 200,
                height: 70,
                fontSize: 70,
                size: 5,
                noise: 3,
                color: false,
                background: '',
                ignoreChars: '',
            };
            var result = svgCaptcha.create(options)
            let key = CryptoJS.AES.encrypt(result.text, process.env.SECRET_CAPTCHA).toString();

            return {
                success: true,
                code: HttpStatus.OK,
                data: {
                    image: result.data,
                    icon: `data:image/jpeg;base64,/9${key}`
                }
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error);
        }
    }

    async validate(val: CaptchaValidateDTO): Promise<IGenericResponse<any>> {
        try {


            var bytes = CryptoJS.AES.decrypt(val.key, process.env.SECRET_CAPTCHA);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            if (originalText == val.value) {
                return {
                    success: true,
                    code: HttpStatus.OK,
                    data: true
                }
            }

            else{
                throw new ErrorManager({
                    type: 'OK',
                    message: `Not validate`
                })
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error);
        }





    }
}