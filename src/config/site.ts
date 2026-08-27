// 站点信息集中配置: 改文案只改这一个文件, Hero/About/头部都从这里读
export const site = {
  name: 'An0313',
  role: '前端工程师 · 工程化与跨端',
  email: 'an_ali@aliyun.com', // 简历邮箱, 如不想公开可改
  github: 'https://github.com/An0313',
  // 首屏 Hero
  hero: {
    eyebrow: '9 年前端 · 工程化与跨端',
    title: '用工程思维 <em>驱动前端、跨端与 AI 工作流</em>',
    sub: '做过 iOS/Android/HarmonyOS 三端上架的 Flutter App,在汽车之家做过近 4 年 RN 频道与移动端组件库,远程交付过德国市场应用。性能、渲染管线、工程取舍、AI 工作流——拆到原理,讲清取舍。',
    techStack: ['Flutter', 'React Native', 'React', 'Vue 3', 'TypeScript', 'Cursor', 'Copilot', 'Node.js', 'HarmonyOS'],
    cta: [
      { label: '关于我', href: '/about/', primary: true },
      { label: 'GitHub', href: 'https://github.com/An0313' },
    ],
  },
  // 关于页
  about: {
    lead: '前端工程师,9 年经验,主攻 Flutter 跨端与移动端工程化。做过 iOS / Android / HarmonyOS 三端上架的 Flutter App,在汽车之家 / 二手车之家做过近 4 年 RN 核心频道与移动端组件库,远程交付过德国市场的社交电商应用。这里写的是架构思考与项目实战,不是命令速查。',
    stack: [
      { name: 'Flutter / 移动端', desc: 'Dart、Provider/Riverpod/Bloc、MethodChannel；iOS/Android/HarmonyOS 构建、适配与上架' },
      { name: '跨端与前端', desc: 'React Native、Taro、uni-app、微信小程序；React/Next.js、Vue 2/3、TypeScript、H5 混合' },
      { name: '后端与数据', desc: 'Node.js(Koa/Egg)、Firebase/Firestore、MySQL、Redis、Nginx、阿里云/Google Cloud' },
      { name: '工程与协作', desc: 'Git/GitHub/GitLab、CI/CD、组件库、Sentry；Slack/ClickUp/飞书/企业微信' },
      { name: 'AI 辅助开发', desc: 'GPT/GLM/DeepSeek/Copilot/Cursor 辅助重构、测试与技术文档' },
    ],
    timeline: [
      { when: '2026.05 — 至今', what: '河北冀联云｜Flutter 移动端', why: '云用工/云就业 App,微信小程序重构为 Flutter,完成 iOS/Android/HarmonyOS 三端适配与上架' },
      { when: '2026.03 — 2026.05', what: '石家庄澜雄｜远程全栈', why: '德国市场社交电商 steakper,React Native + Firebase,跨时区异步交付' },
      { when: '2022.10 — 2025.07', what: '北京宝信(外派汽车之家)｜高级前端', why: 'RN 核心频道性能优化、车商 SaaS H5 重构、移动端组件库 + Sketch 插件落地' },
      { when: '2021.11 — 2022.06', what: '开课吧｜高级前端', why: '米堆学堂官网/H5/CMS/小程序,Next.js SSR 全栈与 SEO 优化' },
      { when: '2020.08 — 2021.06', what: '软通动力(京东汽车)｜高级前端', why: '京车会小程序、云配联盟 PC 电商、数据中台管理后台、微前端' },
    ],
    focus: [
      'Flutter 跨端工程 (iOS/Android/HarmonyOS 一套代码上架、插件 ohos 适配)',
      '移动端性能优化 (RN/Flutter 渲染管线、首屏加载、桥接开销)',
      '设计系统 (Style Dictionary 令牌统一、RN+H5 双端组件库)',
      '远程协作 (跨时区交付、异步沟通、验收标准)',
      'AI 辅助开发 (GPT/Cursor 重构、测试、技术文档)',
    ],
  },
};
