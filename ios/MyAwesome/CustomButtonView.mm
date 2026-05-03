//
//  CustomButtonView.mm
//  MyAwesome
//
//  Fabric Native Component 视图实现
//

#import "CustomButtonView.h"
#import <react/renderer/components/MyAwesomeSpec/ComponentDescriptors.h>
#import <react/renderer/components/MyAwesomeSpec/EventEmitters.h>
#import <react/renderer/components/MyAwesomeSpec/Props.h>
#import <react/renderer/components/MyAwesomeSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface CustomButtonView () <RCTCustomButtonViewProtocol>
@end

@implementation CustomButtonView {
  UIButton *_button;
  NSString *_text;
  UIColor *_color;
  BOOL _disabled;
  CGFloat _cornerRadius;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const CustomButtonProps>();
    _props = defaultProps;
    
    // 创建 UIButton
    _button = [UIButton buttonWithType:UIButtonTypeSystem];
    _button.translatesAutoresizingMaskIntoConstraints = NO;
    [_button addTarget:self
                action:@selector(handleButtonPress:)
      forControlEvents:UIControlEventTouchUpInside];
    
    [self addSubview:_button];
    
    // 设置约束
    [NSLayoutConstraint activateConstraints:@[
      [_button.topAnchor constraintEqualToAnchor:self.topAnchor],
      [_button.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [_button.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      [_button.bottomAnchor constraintEqualToAnchor:self.bottomAnchor]
    ]];
    
    // 默认值
    _text = @"";
    _color = [UIColor systemBlueColor];
    _disabled = NO;
    _cornerRadius = 8.0;
    
    [self updateButton];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomButtonProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomButtonProps const>(props);
  
  // 更新文本
  if (oldViewProps.text != newViewProps.text) {
    _text = [NSString stringWithUTF8String:newViewProps.text.c_str()];
  }
  
  // 更新颜色
  if (oldViewProps.color != newViewProps.color) {
    NSString *colorString = [NSString stringWithUTF8String:newViewProps.color.c_str()];
    _color = [self colorFromHexString:colorString];
  }
  
  // 更新禁用状态
  if (oldViewProps.disabled != newViewProps.disabled) {
    _disabled = newViewProps.disabled;
  }
  
  // 更新圆角
  if (oldViewProps.cornerRadius != newViewProps.cornerRadius) {
    _cornerRadius = newViewProps.cornerRadius;
  }
  
  [super updateProps:props oldProps:oldProps];
  [self updateButton];
}

- (void)updateButton
{
  // 设置文本
  [_button setTitle:_text forState:UIControlStateNormal];
  
  // 设置颜色
  _button.backgroundColor = _color;
  [_button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  
  // 设置禁用状态
  _button.enabled = !_disabled;
  _button.alpha = _disabled ? 0.5 : 1.0;
  
  // 设置圆角
  _button.layer.cornerRadius = _cornerRadius;
  _button.clipsToBounds = YES;
}

- (void)handleButtonPress:(UIButton *)sender
{
  if (_eventEmitter != nullptr) {
    std::dynamic_pointer_cast<const CustomButtonEventEmitter>(_eventEmitter)
        ->onPress(CustomButtonEventEmitter::OnPress{
            .timestamp = [[NSDate date] timeIntervalSince1970]
        });
  }
}

- (UIColor *)colorFromHexString:(NSString *)hexString
{
  unsigned rgbValue = 0;
  NSScanner *scanner = [NSScanner scannerWithString:hexString];
  if ([hexString hasPrefix:@"#"]) {
    [scanner setScanLocation:1];
  }
  [scanner scanHexInt:&rgbValue];
  
  return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0
                         green:((rgbValue & 0xFF00) >> 8)/255.0
                          blue:(rgbValue & 0xFF)/255.0
                         alpha:1.0];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomButtonComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> CustomButtonCls(void)
{
  return CustomButtonView.class;
}
