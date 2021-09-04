#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@class RCTRootView;
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@property (nonatomic, strong) NSDictionary *launchOptions;

- (RCTRootView *)getRootViewForBundleURL:(NSURL *)bundleURL;

@end
