import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

    async getAll(): Promise<Customer[]> {
        try {
            return await this.customerModel.find().exec();
        } catch (error) {
            throw new HttpException(`Can't return all customers`, HttpStatus.NOT_FOUND);
        }
    }

    async getById(id: string): Promise<Customer> {
        try {
            return await this.customerModel.findById(id).exec();
        } catch (error) {
            throw new HttpException(`Customer Id: ${id} not found`, HttpStatus.NOT_FOUND);
        }
    }

    async create(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        try {
            const result = new this.customerModel(createCustomerDTO);

            return await result.save();
        } catch (error) {
            throw new HttpException(`Can't create the customer`, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        try {
            return await this.customerModel.findByIdAndUpdate(id, createCustomerDTO, { new: true});
        } catch (error) {
            throw new HttpException(`Can't update the user with Id: ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: string): Promise<any> {
        return await this.customerModel.findByIdAndDelete(id);
    }
}
