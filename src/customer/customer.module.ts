import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomersSchema } from './schemas/customers.schema';
import { CustomerController } from './customer.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Customer', schema: CustomersSchema}])
    ],
    providers: [CustomerService],
    controllers: [CustomerController]
})
export class CustomerModule {}