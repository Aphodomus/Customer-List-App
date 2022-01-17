import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Post('/create')
    async create(@Res() res, @Body() createCustomer: CreateCustomerDTO) {
        const customer = await this.customerService.create(createCustomer);

        return res.status(HttpStatus.OK).json({
            message: "Customer has been created sucessfully",
            customer
        })
    }

    @Get('customers')
    async getAll(@Res() res) {
        const customers = await this.customerService.getAll();
        return res.status(HttpStatus.OK).json(customers);
    }

    @Get('customer/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const customer = await this.customerService.getById(id);

        if (!customer) {
            throw new NotFoundException('Customer does not exist');
        }

        return res.status(HttpStatus.OK).json(customer);
    }

    @Put('customer/:id')
    async update(@Res() res, @Query('id') id: string, @Body() updateCustomer: CreateCustomerDTO) {
        const customer = await this.customerService.update(id, updateCustomer);

        if (!customer) {
            throw new NotFoundException('Customer does not exist');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Customer has been sucessfully updated',
            customer
        });
    }

    @Delete('customer/:id')
    async delete(@Res() res, @Query('id') id: string) {
        const customer = await this.customerService.remove(id);

        if (!customer) {
            throw new NotFoundException('Customer does not exist');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Customer has been sucessfully deleted',
            customer
        });
    }
}
