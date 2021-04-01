import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let controller: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService, 
          useFactory: jest.fn(() => {
            return {
                confirmMail: jest.fn(),
            };
          })
        }
      ]
    }).compile();

    controller = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('onNewUser', () => {
    it('should send confirmation email', async () => {
      const message = {
        value: ''
      };
      await controller.onNewUser(message);

      expect(mailService.confirmMail).toHaveBeenCalledWith(message.value);
    });
  });
});
