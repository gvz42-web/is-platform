module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./frontend",
      script: "npm",
      args: "run start"
    },
    {
      name: "backend",
      cwd: "./backend",
      script: "npm",
      args: "run start"
    }

  ]
}