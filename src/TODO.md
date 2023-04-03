1. 工具类选择

- [ ] yargs/commander
- [ ] inquirer
- [ ] chalk
- [ ] ora
- [ ] progress
- [ ] configstore/conf

2. interface

- `uc init [-d dir]`，当前目录初始化 `prettier` 模板和 `.vscode/settings` 文件夹
  - JSON 文件读取/写入
  - 文件夹/文件创建并写入数据
- `uc --custom / -c pretiier`，自定义指定 `prettier` 规范
- `uc --custom / -c settings`，自定义指定 `settings` 配置
- `uc last`，使用上一次的配置
- `uc format`，对所有的已有文件进行递归遍历格式化并保存
  - 格式化过程中的 progress 的进度展示
