---
title: "Flutter HarmonyOS 适配实战: 从插件 ohos 实现到三端打包链路"
date: 2026-06-25 16:00:00
tags:
  - flutter
  - 移动端
description: 把微信小程序重构为 Flutter App 还要兼顾 HarmonyOS。基于云用工项目实战,拆解 Flutter for HarmonyOS 的工程结构、插件 ohos 实现的 dependency_overrides 套路、平台能力适配层和三端打包链路。
permalink: /2026/06/25/flutter-harmonyos适配实战/
---

2026 年把一个微信小程序重构为 Flutter App,目标三端(iOS / Android / HarmonyOS)一套代码上架。HarmonyOS 这关最绕——它不是上游 Flutter,常用插件也没有官方 ohos 实现。这篇记一下云用工项目落地 HarmonyOS 时打通的几个关键点。

## 一、Flutter for HarmonyOS: 不是上游 Flutter

HarmonyOS 不能用官方 Flutter SDK 直接跑。华为维护了一个 Flutter for OpenHarmony 的 fork,版本号带 `oh_` 前缀。项目用 FVM 锁定:

```json
// .fvmrc
{ "flutter": "oh_3.27.4_dev" }
```

含义:这个 SDK 是华为 fork 的 3.27.4 开发版,和上游 3.27 行为接近但带 ohos 平台支持。团队必须用 FVM 统一,否则有人用官方 SDK 跑不起来 ohos 端。

## 二、三端工程结构: android / ios / ohos + 共用 lib

Flutter 项目天然多端,加 HarmonyOS 后工程根多了 `ohos/` 目录,和 `android/`、`ios/` 平级:

```
flutter-company-app/
  android/    # Android 原生工程
  ios/        # iOS 原生工程
  ohos/       # HarmonyOS 原生工程(华为 ArkTS/ArkUI)
    AppScope/
      app.json5
    entry/
      build-profile.json5
      oh-package.json5
    build-profile.json5
  lib/        # 共用 Dart 代码
```

`ohos/` 里是标准的鸿蒙工程(AppScope / entry),构建配置在 `build-profile.json5`,签名材料放 `ohos/签名/`。`lib/` 下的 Dart 代码三端共用,业务逻辑只写一份。

## 三、插件没官方 ohos 实现: dependency_overrides 套路

这是适配 HarmonyOS 最绕的一关。常用插件(image_picker / path_provider / shared_preferences / webview_flutter / video_player)在 pub.dev 上只有 android+ios 实现,没有 ohos。直接依赖跑不起来。

解法:用 `dependency_overrides` 把这些插件指向带 ohos 实现的版本(华为社区或自 patched):

```yaml
# pubspec.yaml
dependencies:
  image_picker:
    path: ../flutter_packages/packages/image_picker/image_picker
  webview_flutter:
    path: ../flutter_packages/packages/webview_flutter/webview_flutter

dependency_overrides:
  image_picker_ohos:
    path: ../flutter_packages/packages/image_picker/image_picker_ohos
  path_provider_ohos:
    path: ../flutter_packages/packages/path_provider/path_provider_ohos
  shared_preferences_ohos:
    path: ../flutter_packages/packages/shared_preferences/shared_preferences_ohos
  webview_flutter_ohos:
    path: ../flutter_packages/packages/webview_flutter/webview_flutter_ohos
  video_player_ohos:
    path: ../flutter_packages/packages/video_player/video_player_ohos
```

我们把 patched 后的插件源码集中放在 `flutter_packages/` 仓库,和主项目平级,通过相对路径引用。好处:ohos 实现的修复能立即生效,不用等 pub 发布。代价:多了一个本地仓库依赖,CI 要一起 clone,新成员上手要拉两个仓库。

> 这是 HarmonyOS 适配的"基础设施"——插件层打通了,业务代码才能三端共用。简历里"鸿蒙社区 SDK 兼容适配"指的就是这一层。

## 四、平台能力适配层: platform / adapter 抽象

原生能力(剪贴板、文件存储、WebView、微信分享、设备窗口等)三端 API 不同。直接在业务里调平台 API 会硬编码,后续加端要改业务。

我们在 `lib/platform/` 下给每项能力建 adapter 接口 + 各端实现:

```
lib/platform/
  clipboard/
    adapter/clipboard_adapter.dart        # 抽象接口
    plugin/flutter_clipboard_adapter.dart # Flutter 实现
  file_storage/
    adapter/file_storage_adapter.dart
  webview/
    adapter/webview_adapter.dart
  wechat_share/
    adapter/wechat_share_adapter.dart
  device_window/
    adapter/device_window_adapter.dart
```

业务层只依赖 adapter 接口,不碰具体平台 API。加 HarmonyOS 时,只在 platform/ 下加 ohos 实现,业务代码不动。这是"可替换端"的关键——和之前那篇 Flutter 状态管理里讲的"可测试性"一脉相承,依赖抽象不依赖具体。

## 五、三端打包: --flavor + --dart-define

三端各自打包命令,用 `--dart-define=APP_ENV` 控制环境,`--flavor` 区分 HarmonyOS 产品风味:

```bash
# Android APK
fvm flutter build apk --release \
  --dart-define=APP_ENV=production \
  --dart-define=ENABLE_CONSOLE_LOGS=false

# iOS IPA
fvm flutter build ipa --release \
  --dart-define=APP_ENV=production \
  --export-options-plist=ios/ExportOptions-TestFlight.plist

# HarmonyOS HAP(本地调试包)
fvm flutter build hap --release \
  --flavor production \
  --dart-define=APP_ENV=production \
  --dart-define=ENABLE_CONSOLE_LOGS=false

# HarmonyOS APP(上架包)
fvm flutter build app --release \
  --flavor production \
  --dart-define=APP_ENV=production
```

HarmonyOS 有 HAP(本地调试包)和 APP(上架包)两种产物。production 用 `ohos/签名/YunYongGong.p12` 正式签名,default/simulation 用本机开发签名。**铁律:`--flavor` 必须和 `APP_ENV` 对齐**,否则签名和环境错配,打出来的包跑错接口。

## 六、踩过的坑

- **webview_flutter 三端实现**:android / wkwebview / ohos 三个实现包都要 override,漏一个对应端就跑不起来
- **image_picker ohos**:华为社区版本和上游 API 有微差,调用参数要对齐,不能直接照搬上游文档
- **版本同步三处**:`pubspec.yaml` 版本 + 各端构建版本号 + `bootstrap_config.dart` 的 `APP_VERSION_CODE` 要手工同步,漏一处 App 内升级比较会错
- **FVM 统一**:`oh_3.27.4_dev` 必须用 FVM 装,有人用官方 3.27 会 ohos 端构建失败,排错半天才意识到 SDK 不对

## 小结

HarmonyOS 适配的核心不是 Dart 代码改造(业务层基本不动),而是插件层和构建链路。打通 `Flutter for HarmonyOS SDK + 插件 ohos 实现 + adapter 抽象 + 三端 --flavor 打包` 这条链,一套 Dart 代码就能上 iOS / Android / HarmonyOS 三个应用商店。鸿蒙生态还在快速演进,社区插件成熟度参差,这是 2026 年做 Flutter 跨端绕不过的现实。
