import{
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { PrismaClient, Company } from '@prisma/client'

const prisma = new PrismaClient();
@Controller('/api/company')
export class CompanyController{

@Post("create")
async create(@Body() company : Company){
    try{
        return await prisma.company.create({data: company});
    }catch(e){
        return {statsus: 500, message: e.message}
    }
}

@Get('info')
async info(){
    try{
        return await prisma.company.findFirst();

    }catch(e){
         return {statsus: 500, message: e.message}
    }
}

@Put('edit/:id')
async edit(@Body() company: Company, @Param('id') id: string){
    try{
        const idvalid = parseInt(id);
        return await prisma.company.update({data: company,where: {id: idvalid}})

    }catch(e){
        return {massage: e.massage}
    }
}

}