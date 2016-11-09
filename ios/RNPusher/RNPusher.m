//
//  RNPusher.m
//  RNPusher
//
//  Created by igor on 11/8/16.
//  Copyright © 2016 igor. All rights reserved.
//

#import "RNPusher.h"
#import "RCTLog.h"

@implementation RNPusher

- (NSData *) stringToDeviceToken:(NSString *)deviceToken {
    NSString *command = [deviceToken stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSMutableData *commandToSend= [[NSMutableData alloc] init];
    unsigned char whole_byte;
    char byte_chars[3] = {'\0','\0','\0'};
    int i;
    for (i=0; i < [command length]/2; i++) {
        byte_chars[0] = [command characterAtIndex:i*2];
        byte_chars[1] = [command characterAtIndex:i*2+1];
        whole_byte = strtol(byte_chars, NULL, 16);
        [commandToSend appendBytes:&whole_byte length:1];
    }
    return commandToSend;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(pusherWithKey:(NSString *)key)
{
    RCTLogInfo(@"pusherWithKey, key: %@", key);
    self.pusher = [PTPusher pusherWithKey:key delegate:self encrypted:YES];
}

RCT_EXPORT_METHOD(registerWithDeviceToken:(NSString *)deviceToken)
{
    RCTLogInfo(@"registerWithDeviceToken, deviceToken: %@", deviceToken);
    NSData *tokenData = [self stringToDeviceToken:deviceToken];
    [[[self pusher] nativePusher] registerWithDeviceToken:tokenData];
}

RCT_EXPORT_METHOD(subscribe:(NSString *)interest)
{
    RCTLogInfo(@"subscribe, interest: %@", interest);
    [[[self pusher] nativePusher] subscribe:interest];
}

RCT_EXPORT_METHOD(unsubscribe:(NSString *)interest)
{
    RCTLogInfo(@"unsubscribe, interest: %@", interest);
    [[[self pusher] nativePusher] unsubscribe:interest];
}

@end
