import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VcsModule } from './vcs/vcs.module';

@Module({
  imports: [VcsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
