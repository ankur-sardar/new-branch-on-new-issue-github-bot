module.exports = async (context) => {
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  // const ref = `heads/${context.payload.pull_request.head.ref}`
  const issueTitle = context.payload.issue.title.replace(/ /g,"-");
  const ref = `refs/heads/issue-${context.payload.issue.number}-${issueTitle}`
  
  const masterBanch = `heads/master`

  const result = await context.github.gitdata.getReference({owner, repo, ref: masterBanch})

  context.log.info('Adding a new branch')

  const sha = result.data.object.sha

  try {
    await context.github.gitdata.createReference({ owner, repo, ref, sha })
    context.log.info(`Successfully created ${owner}/${repo}/${ref}`)
  } catch (e) {
    context.log.warn(e, `Failed to create branch ${owner}/${repo}/${ref}`)
  }
}