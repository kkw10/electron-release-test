const electronInstaller = require('electron-winstaller');

const main = async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './dist/build-win32-x64',
      outputDirectory: './dist/installer-win32-x64',
      authors: 'kkw10',
      exe: 'build.exe',
      description: 'electron release testing...'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }  
};

main();