// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as childProcess from 'child_process';

let outputChannel: vscode.OutputChannel;

/**
 * Prints the given content on the output channel.
 *
 * @param content The content to be printed.
 * @param reveal Whether the output channel should be revealed.
 */
export const printChannelOutput = (content: string, reveal = false): void => {
	outputChannel.appendLine(content);
	if (reveal) {
		outputChannel.show(true);
	}
};
// const exec = (cmd: string) =>
// 	new Promise((res, rej) =>
// 		child_process.exec(cmd, (err, stdout, stderr) =>
// 			err ? rej([err, stderr]) : res([stdout, stderr])
// 		)
// 	);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	outputChannel = vscode.window.createOutputChannel("Key Runner");
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "key-runner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('key-runner.run', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from key-runner!');


		async function getTerminal(): Promise<vscode.Terminal> {
			let terminal;
			if (vscode.window.terminals.length > 0) {
				terminal = vscode.window.terminals[vscode.window.terminals.length - 1];

				const pid = await terminal.processId;
				if (pid) {
					outputChannel.appendLine(`Terminal PID: ${pid}`);

					const tty = await new Promise((res, rej) => {
						childProcess.exec(`ps -o tty "${pid}"`, (err, stdout, stderr) => {
							if (err) {
								rej(err);
								return;
							}
							res(stdout.split("\n")[1].trim());
						});
					});
					outputChannel.appendLine(`Terminal TTY: ${tty}`);

					childProcess.exec(`ps -t ${tty} -o pid,state,cmd | awk '!/Z/ {print $0}'`, (err, stdout, stderr) => {
						if (err) {
							return;
						}

						outputChannel.appendLine(`stdout: ${stdout}`);

					});
				}


				// const [ttyout, ttyerr] =await exec(`ps -o tty "${pid}"`);
				// const tty = ttyout.split("\n")[1].trim();
				// const [pidout, piderr] = await exec(`ps -t ${tty} -o pid,ppid,start,command`);
				// const list = pidout
				// 	.split("\n")
				// 	.slice(1)
				// 	.map(line => {
				// 		const [pid, ppid, start, ...commandParts] = line.trim().split(/\s+/g);
				// 		const command = commandParts.join(" ");
				// 		return { pid, start, command, ppid };
				// 	})
				// 	.filter(line => line.ppid == parentPid);

			} else {
				terminal = vscode.window.createTerminal();
			}

			return terminal;
		}
		const terminal = await getTerminal();

		terminal.sendText(`go-task`);
		terminal.show();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
