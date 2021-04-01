import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserResponse } from 'src/user-create.payload';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  confirmMail(user: UserResponse) {
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome! Please confirm your mail',
      template: 'welcome',
      context: {
        username: user.firstName,
      }
    });
  }
}
