const child_process = require('child_process')
const KILL = require('tree-kill')

export const kill = (pid) => {
  if (!pid) {
    return
  }
  return new Promise((res, rej) => {
    KILL(pid, 'SIGKILL', function (err) {
      !err ? res('success') : rej(err)
    })
  })
}

export const LS = (param = {}, callback) => {
  const config = {
    command: '',
    path: ''
  }
  Object.assign(config, param)
  return new Promise((res, rej) => {
    const ls = child_process.spawn(config.command, {
      encoding: 'utf8',
      cwd: config.path, // 执行命令路径
      shell: true // 使用shell命令
    })

    ls.stdout.on('data', (data) => {
      const value = data.toString().trim()
      callback(value, ls.pid)
    })
    ls.stderr.on('data', (data) => {
      const value = data.toString().trim()
      callback(value, ls.pid)
    })
    ls.on('close', () => {
      res()
    })
  })
}
