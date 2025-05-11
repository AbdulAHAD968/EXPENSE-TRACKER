module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "run dev",
      cwd: "./server",
    },
    {
      name: "frontend",
      script: "npm",
      args: "start",
      cwd: "./",
    },
  ],
};