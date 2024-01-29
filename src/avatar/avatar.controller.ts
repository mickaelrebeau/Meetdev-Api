import { Controller, Delete, Param } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private fileService: AvatarService) {}

  @Delete(':idFile')
  destroyFile(@Param('idFile') id: string) {
    return this.fileService.delete(id);
  }
}
