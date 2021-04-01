import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(
        private readonly mailService: MailService
    ) {}

    @MessagePattern('ydr-users')
    async onNewUser(@Payload() message: any): Promise<void> {
        return this.mailService.confirmMail(message.value);
    }
}
