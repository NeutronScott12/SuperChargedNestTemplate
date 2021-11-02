import { MailerOptions } from '@nestjs-modules/mailer'
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface'
import { ConfigService } from '@nestjs/config'

class MailOptions {
    static getMailOptions(configService: ConfigService): MailerOptions {
        return {
            transport: {
                service: 'Gmail',
                auth: {
                    user: configService.get('GMAIL_MAIL_USER'),
                    pass: configService.get('GMAIL_MAIL_PASS'),
                },
            },
        }
    }
}

export const asyncMailOptions: MailerAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
        MailOptions.getMailOptions(configService),
    imports: [ConfigService],
}
