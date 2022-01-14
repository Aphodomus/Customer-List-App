import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://teste777:Wb7aMjDuYDQScQx@cluster0.uvhnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
