const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

class CommandServiceProvider {
  constructor() {
    this.program = new Command();
    this.commands = [];
  }

  loadCommands() {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir);

    commandFiles.forEach((file) => {
      const commandPath = path.join(commandsDir, file);
      const CommandClass = require(commandPath);
      const commandInstance = new CommandClass();

      this.commands.push(commandInstance);
    });
  }

  registerCommands() {
    this.commands.forEach((command) => {
      this.program
        .command(command.command)
        .description(command.description)
        .action(() => {
        
          const startTime = performance.now();

          try {
            const promise = new Promise((resolve, reject) => {
                command.execute();
                resolve('success');
            });
            
            promise.then((result) => {
                console.log(result); // 'success'
                const endTime = performance.now();
                const executionTime = endTime - startTime;
                console.log(`Command "${command.command}" executed in ${executionTime.toFixed(2)} milliseconds`);
            }).catch(error => {
                reject(error);
            });
            
            
            
          } catch (error) {
            console.error('Error:', error);
            
          }
          
        });
    });
  }
  boot() {
    this.loadCommands();
    this.registerCommands();
    this.program.parse(process.argv);
  }
}

module.exports = CommandServiceProvider;
