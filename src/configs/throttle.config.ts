import {
    ThrottlerAsyncOptions,
    ThrottlerModuleOptions,
} from '@nestjs/throttler'
import { ConfigService } from '@nestjs/config'

class ThrottlerOptions {
    static getThrottlerOptions(
        configService: ConfigService,
    ): ThrottlerModuleOptions {
        return {
            ttl: configService.get('THROTTLE_TTL'),
            limit: configService.get('THROTTLE_LIMIT'),
            ignoreUserAgents: [new RegExp('bingbot', 'gi')],
        }
    }
}

export const asyncThrottlerOptions: ThrottlerAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService) =>
        ThrottlerOptions.getThrottlerOptions(configService),
    imports: [ConfigService],
}
