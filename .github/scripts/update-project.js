import { graphql } from '@octokit/graphql';

const event = JSON.parse(process.argv[2]);

const token = process.env.GITHUB_TOKEN;
const projectNumber = process.env.PROJECT_NUMBER;
const org = process.env.ORGANIZATION;

const client = graphql.defaults({
	headers: {
		authorization: `token ${token}`,
	},
});

// Label → Status mapping
const STATUS_MAP = {
	'status: backlog': 'Backlog',
	'status: ready': 'Ready',
	'status: in-progress': 'In Progress',
	'status: ready-for-review': 'Ready for Review',
	'status: done': 'Done',
};

async function run() {
	const issue = event.issue || event.pull_request;
	if (!issue) return;

	const labels = issue.labels.map(l => l.name);

	// Find the first status label applied
	const statusLabel = labels.find(l => STATUS_MAP[l]);
	const statusValue = STATUS_MAP[statusLabel];

	// If issue closed → force Done
	const isClosed = issue.state === 'closed';
	const finalStatus = isClosed ? 'Done' : statusValue;

	if (!finalStatus) return;

	// Get project and field IDs
	const projectData = await client(
		`
    query($org: String!, $number: Int!) {
      organization(login: $org) {
        projectV2(number: $number) {
          id
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
		{
			org,
			number: Number(projectNumber),
		},
	);

	const project = projectData.organization.projectV2;
	const statusField = project.fields.nodes.find(f => f.name === 'Status');

	if (!statusField) return;

	const option = statusField.options.find(o => o.name === finalStatus);
	if (!option) return;

	// Add issue to project if not already present
	const addItem = await client(
		`
    mutation($project: ID!, $content: ID!) {
      addProjectV2ItemById(input: {
        projectId: $project,
        contentId: $content
      }) {
        item {
          id
        }
      }
    }
  `,
		{
			project: project.id,
			content: issue.node_id,
		},
	);

	const itemId = addItem.addProjectV2ItemById.item.id;

	// Update the Status field
	await client(
		`
    mutation($project: ID!, $item: ID!, $field: ID!, $option: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $project,
        itemId: $item,
        fieldId: $field,
        value: {
          singleSelectOptionId: $option
        }
      }) {
        projectV2Item {
          id
        }
      }
    }
  `,
		{
			project: project.id,
			item: itemId,
			field: statusField.id,
			option: option.id,
		},
	);

	console.log(`Updated issue #${issue.number} → ${finalStatus}`);
}

run().catch(err => {
	console.error(err);
	process.exit(1);
});
