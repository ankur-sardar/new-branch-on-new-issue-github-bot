
module.exports = async (context) => {
  context.log.info('An Issue is Created or Edited')
  // Skip task if there is no assignees
  if (context.payload.issue.assignees.length == 0) {
    context.log.info(`New Issue with NO Assignee is Detected`)
    return
  }
  context.log.info('A New issue with assignee detected!')
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const branchName = context.payload.issue.title.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').toLowerCase();

  const validBranchName = branchName.replace(/[&\/\\#,+()$~%.`'":*?<>{}]/g, '');

  // Remove all special charecter from branch name to get a valid name
  const ref = `refs/heads/issue-${context.payload.issue.number}-${validBranchName}`
  
  const baseBranch = `heads/${context.payload.repository.default_branch}`

  const result = await context.github.gitdata.getReference({owner, repo, ref: baseBranch})
  
  const sha = result.data.object.sha

  context.log.info(context.payload.issue.assignees)
  try {
    context.log.info('Adding a new branch')
    await context.github.gitdata.createReference({ owner, repo, ref, sha })
    context.log.info(`Successfully created ${owner}/${repo}/${ref}`)
  } catch (e) {
    context.log.warn(e, `Failed to create branch ${owner}/${repo}/${ref}`)
  }
}