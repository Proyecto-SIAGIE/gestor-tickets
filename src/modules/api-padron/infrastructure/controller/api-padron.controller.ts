import { Body, Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ApiPadronImplService } from "../../application/service/api-padronImpl.service";
import { IIEEPadronDto } from "../../application/dto/iiee-padron.dto";

@ApiTags('api-padron')
@Controller('api-padron')
export class ApiPadronController {
    constructor(private readonly apiPadronService: ApiPadronImplService){}

    @Get('DRE')
    async getAllDRE(){
        return await this.apiPadronService.listAllDRE();
    }

    @Get('DRE/:dreCode/UGEL')
    async getAllUgelByDRE(@Param('dreCode') dreCode: string){
        return await this.apiPadronService.listAllUGELByDRECode(dreCode);
    }

    @ApiQuery({name: 'anexo', type: String, required: true})
    @ApiQuery({name: 'nivel', type: String, required: true})
    @Get('DRE/:dreCode/UGEL/:ugelCode/InstitucionesEducativas')
    async getAllIEByParams(@Param('dreCode') dreCode: string, @Param('ugelCode') ugelCode: string, @Query() iieePadron: IIEEPadronDto ){
        return await this.apiPadronService.listIIEEByDREAndUgel(dreCode, ugelCode, iieePadron);
    }
}