export function getThreadId (category, agent, client, provider) {
	return `${category}_${agent.username}_${client.username}_${provider.from}_${provider.id}`;
}
