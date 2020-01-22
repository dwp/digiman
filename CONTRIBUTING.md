# Contribution guidelines

We really like contributions and bug reports.
We do have a few guidelines to bear in mind.

## Raising bugs

When raising bugs please explain the issue in good detail and provide a guide to how to replicate it.
When describing the bug it's useful to follow the format:

- what you did
- what you expected to happen
- what happened

## Suggesting features

Please raise feature requests as issues before contributing any code.

This ensures they are discussed properly before any time is spent on them.

## GOV.UK Elements

The project contains code taken from the [GOV.UK Elements](https://github.com/alphagov/govuk_elements/) project.
Please check that any issues related to that code are raised with that project, not this one.

## Contributing code

### Versioning

Follow the guidelines on [semver.org](http://semver.org/) for assigning version
numbers.

Versions should only be changed in a commit of their own, in a pull request of
their own. This alerts team members to the new version and allows for
last-minute scrutiny before the new version is released. Also, by raising a
separate pull request, we avoid version number conflicts between feature
branches.

### Commit hygiene

Please see the [git style guide](https://github.com/alphagov/styleguides/blob/master/git.md)
which describes how we prefer git history and commit messages to read across GOV.UK projects.

## To release a new version

Update CHANGELOG.md to summarise the changes made since the last release.

Propose a new version number in VERSION.txt and update package.json with the new version number.

Open a new pull request with a single commit including the above changes.

[Here is an example for v6.1.0](https://github.com/alphagov/govuk_prototype_kit/commit/53e36d79a994ce3649b53f4008370cd75068c27c).

Once merged into master a new version will be built.
