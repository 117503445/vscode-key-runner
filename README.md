# vscode-key-runner

> 许多年以后，面对分布式系统开发中每次修改代码后运行所需要的繁琐操作，工程师们总会想起 VB6 中按下 F5 就能跳出窗口的那个遥远下午。

`go-task` 是一个 Go 语言编写的命令运行器，使用体验非常友好。安装 `vscode-key-runner` 扩展后，只需要按下 F5，就可以在 VSCode 终端中运行 `go-task` 命令，从而调用 `Taskfile.yml` 中定义的 default 任务。

## 安装

下载 <https://github.com/117503445/vscode-key-runner/releases/download/2025.0219.1530/key-runner-0.0.1.vsix>，然后在 VS Code 中点击 `扩展` -> `从 VSIX 安装 ...`，选择下载的 vsix 文件。

## 使用

在 `keyBindings.json` 中添加以下配置：

```json
{
    "key": "f5",
    "command": "key-runner.run"
},
```

在 `settings.json` 中添加以下配置，以防止在终端中无法触发快捷键：

```json
"terminal.integrated.commandsToSkipShell": [
    "key-runner.run"
],
```

安装 `go-task`，编写 `Taskfile.yml`，详情见 [go-task documentation](https://taskfile.dev/usage/)。
