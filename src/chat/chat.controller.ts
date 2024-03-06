import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dtos/createChat';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  getChatById(@Param('id') id: string) {
    return this.chatService.getChat(id);
  }

  @Post()
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }
}
