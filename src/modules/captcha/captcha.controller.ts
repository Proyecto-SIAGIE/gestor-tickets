import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CaptchaService } from "./captcha.service";
import * as CryptoJS from 'crypto-js';
import { IGenericResponse } from "src/utils/generic";
import { HttpStatusCode } from "axios";
import { ErrorManager } from "src/utils/errors/error.manager";
import { CaptchaValidateDTO } from "./captcha-validate.dto";

@ApiTags('captcha')
@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService){}

    @Get()
    async generateCaptcha() {
        return await this.captchaService.generate();
    }

    @Post()
    async validateCaptcha(@Body() val: CaptchaValidateDTO) {
        return await this.captchaService.validate(val);
    }
}