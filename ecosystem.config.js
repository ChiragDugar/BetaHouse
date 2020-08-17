module.exports = {
  apps : [
		{
			name: 'beta-house-frontend',
			script: 'npx',
			interpreter: 'none',
			args: 'serve -s build',
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
}
