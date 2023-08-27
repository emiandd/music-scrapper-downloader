import chalk from 'chalk';

export function Info(text) {
	console.log(`${chalk.green('>')} ${text}`);
}

export function Warning(text) {
	console.log(`${chalk.yellow('>')} ${text}`);
}

export function Err(text) {
	console.log(`${chalk.red('>')} ${text}`);
	return;
}


