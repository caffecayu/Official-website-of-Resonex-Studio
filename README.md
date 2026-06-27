# ResoNex Studio / 《静默区》游戏官网

这是 ResoNex Studio 为《静默区 SILENT AREA》准备的静态游戏官网项目，用于展示游戏定位、核心机制、回合流程、单位体系和后续官方入口。

项目保持纯静态结构，适合直接部署到 Cloudflare Pages，不需要后端、数据库或构建流程。

## 项目结构

```text
.
├── index.html
├── styles.css
├── script.js
├── assetsmapsmap-korea.png
├── assetsmapsmap-east-asia.png
├── assetsmapsmap-beijing.png
└── README.md
```

- `index.html`：首页 HTML 结构、页面文案和占位链接，必须保留在项目根目录。
- `styles.css`：视觉样式、响应式布局和移动端导航样式。
- `script.js`：移动端导航展开/收起、锚点平滑滚动、整屏滚动辅助、雷达时间点、单位转盘和 `#` 占位链接处理。
- `README.md`：项目说明、预览方式、部署方式和维护建议。

## 本地预览

方式一：直接用浏览器打开根目录下的 `index.html`。

方式二：在项目根目录启动一个本地静态服务：

```powershell
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

如果本机没有 Python，也可以使用任意静态文件服务器，只要把项目根目录作为网站根目录即可。

## Cloudflare Pages 部署

保持 Cloudflare Pages 静态部署方式：

- Framework preset：`None`
- Build command：留空
- Build output directory：`/`
- Root directory：仓库根目录或当前项目目录

部署前确认：

- `index.html` 位于项目根目录。
- `styles.css` 和 `script.js` 与 `index.html` 位于同一目录。
- 页面资源使用相对路径引用。
- 外部渠道未正式上线前，Steam、Bilibili、TapTap、开发日志等链接继续保留为 `#`。

## 地图资源替换说明

作战计划页使用“透明地图 PNG 底图 + SVG 交互覆盖层”方案。地图底图文件放在项目根目录，目前使用：

- `assetsmapsmap-korea.png`：再战朝鲜
- `assetsmapsmap-east-asia.png`：至暗之时
- `assetsmapsmap-beijing.png`：烈焰升腾
- `assetsmapsmap-pacific.png`：东瀛陆沉，未提供时会自动 fallback 到东亚地图

地图配置集中在 `script.js` 的 `campaignPlans` 中。每个战区包含：

- `mapImage`：地图 PNG 相对路径。
- `mapAlt`：地图说明文本。
- `mapTransform`：底图微调参数，包含 `scale`、`x`、`y`。如果地图在容器里偏大、偏小或位置不准，优先改这里，不要直接改图片文件。
- `points`：地图点位列表。

地图容器使用固定逻辑坐标 `1000 x 560`。每个点位的 `x` / `y` 都是这个逻辑坐标系里的坐标，不是百分比。微调城市或战役点位时，只需要修改对应 point 的 `x`、`y`，SVG 覆盖层里的倒三角、地点文字和连接线会同步移动。

## 内容维护建议

- 文案内容优先在 `index.html` 中维护。
- 样式调整集中放在 `styles.css`，避免把页面样式分散到 HTML 内联样式中。
- 交互逻辑集中放在 `script.js`，当前只保留轻量前端交互。
- 后续新增截图、PV、logo、媒体包时，建议创建 `assets/` 目录，并使用相对路径引用。
- 官方渠道链接确认后，只替换 `#join` 区块里的 `#` 占位链接。
- 更新首页后，至少检查桌面端和移动端宽度下的导航、标题、卡片、按钮和页脚显示。
