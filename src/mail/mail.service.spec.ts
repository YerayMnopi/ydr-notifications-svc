import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserResponse } from 'src/user-create.payload';

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MailerService, 
          useFactory: jest.fn(() => ({
            sendMail: jest.fn()
          }))
        },
        MailService
      ]
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('confirmMail', () => {
    it('should call mailer service', () => {
      const user = {
        email: 'test',
        firstName: 'test'
      } as UserResponse;
      const mail = {
        to: user.email,
        subject: 'Welcome! Please confirm your mail',
        template: 'welcome',
        context: {
          username: user.firstName,
        }
      }
  
      service.confirmMail(user);
  
      expect(mailerService.sendMail).toHaveBeenCalledWith(mail);
    });

  });
});
