:root {
  --color-bg: #F5F0E8;        /* 和纸米白 */
  --color-surface: #EDE8DC;   /* 旧纸面 */
  --color-text: #2C2820;      /* 墨色，不用纯黑 */
  --color-muted: #8C8070;     /* 褪色的茶褐 */
  --color-accent: #6B4F3A;    /* 枯木棕，唯一的强调色 */
  --color-border: #D4CBC0;    /* 极淡的边线 */
}
```

**2. 字体指定**
```
中文：Noto Serif SC（有笔触感）
英文/数字：DM Serif Display 或 Cormorant Garamond
UI 小字：Noto Sans SC 300 weight
```

**3. 规则说明（用祈使句）**
```
- 间距要慷慨，组件之间的 padding 至少 32px
- 不用阴影，用极细的 1px border 或留白区分层级
- 不用圆角或用极小的 2px
- 动效：只用 opacity 和 transform，duration 300-500ms，easing: ease-out
- 绝对不用渐变背景
- icon 只用线条风格，stroke-width 1px
- 图片统一加 sepia(20%) filter