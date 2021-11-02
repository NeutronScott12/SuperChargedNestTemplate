import { BullModuleOptions, SharedBullAsyncConfiguration } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'

class BullConfigOptions {
    static getBullConfig(configService: ConfigService): BullModuleOptions {
        return {
            redis: {
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
            },
        }
    }
}

export const asyncBullConfigOptions: SharedBullAsyncConfiguration = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
        BullConfigOptions.getBullConfig(configService),
    imports: [ConfigService],
}
