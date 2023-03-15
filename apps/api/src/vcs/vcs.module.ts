import { Module } from '@nestjs/common';
import { VcsController } from './vcs.controller';
import { VcsService } from './vcs.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [VcsController],
  providers: [VcsService],
})
export class VcsModule {}
