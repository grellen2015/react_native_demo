//
//  ReloadModule.m
//  rifeng
//
//  Created by RFMac on 2021/9/1.
//

#import "ReloadModule.h"

@implementation ReloadModule

RCT_EXPORT_MODULE(Reload);

RCT_EXPORT_METHOD(reloadModule:(RCTResponseSenderBlock)successCallback)
{
  NSLog(@"reload module call!!!!!!!!!!!!!!");
  successCallback([NSArray arrayWithObjects:@"hahaha", nil]);
}

@end
