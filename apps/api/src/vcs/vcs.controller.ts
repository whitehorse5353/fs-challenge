import { Controller, Get, Param } from '@nestjs/common';
import { VcsService } from './vcs.service';

@Controller('vcs/user')
export class VcsController {
  constructor(private vcsService: VcsService) {}
  @Get(`:username`)
  getUserProfile(@Param('username') username: string) {
    return this.vcsService.getUserProfile(username);
  }

  @Get(`:username/orgs`)
  getUserOrganisations(@Param('username') username: string) {
    return this.vcsService.getUserOrganisations(username);
  }
  @Get(`:username/gists`)
  getUserGists(@Param('username') username: string) {
    return this.vcsService.getUserGists(username);
  }
}
