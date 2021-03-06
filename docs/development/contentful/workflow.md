# Workflow

We maintain an export file of each Contentful content type in code, in order to use pull requests for reviewing changes to the Contentful content types. The export files are created via the [Contentful CLI](https://github.com/contentful/contentful-cli).

## Environments

Our Contentful space has three environments:

- **`master`**: Hosts our production content, and used for editorial workflows.

- **`qa`**: An exact copy of `master`, refreshed weekly. Used to test any new changes before deploying or running on production.

- **`dev`**: A sandbox environment consisting of test campaigns, beta content types, and dummy data. Developers can experiment here without breaking anything on the production end or adding clutter to the `master` environment. Migrations and new Content Types and fields can be fleshed out here, before moving forward to `qa` and `master`.

## Process

To create or edit a Contentful content type(s):

### 1\) Create a new branch

We'll use this branch to open a pull request to add or update export file(s) per the content type changes we'll be making.

### 2\) Make the changes on **`dev`** via Contentful UI

Use the web interface to create new content type, or add, update, or remove fields from existing content types.

### 3\) Export the changes as migrations

[Generate a migration](https://github.com/contentful/contentful-cli/tree/master/docs/space/generate/migration) for each content type added or edited, saving it to the relevant `contentful/content-types` file, e.g. `contentful/content-types/currentSchoolBlock.js`

```bash
$ contentful space generate migration -s $SPACE_ID -e dev -c currentSchoolBlock -f contentful/content-types/currentSchoolBlock.js
```

Upon success, you'll see:

```bash
$ contentful space generate migration -s $SPACE_ID -e dev -c currentSchoolBlock -f contentful/content-types/currentSchoolBlock.js

Fetching content model
Creating migration for content type: 'currentSchoolBlock'
Fetching editor interface
Migration file created at contentful/content-types/currentSchoolBlock.js
```

### 4\) Create a pull request

Once you've added all changes into the `contentful/content-types` files, open a pull request for review.
_We find it helpful to update/create the documentation for the content type within this pull request to help clarify the changes in the migration_

### 5\) Upon merge, apply changes to Contentful `qa` and `master`.

Once approved, the content type changes must manually be applied to the `qa` and `master` environments.

#### Update content type

For updates to existing Content types, make the corresponding changes via the Contentful UI in the `qa` and `master` environments.

#### New content type

For brand new Content types, it’s easiest to run the CLI [migration](https://github.com/contentful/contentful-cli/tree/master/docs/space/import) command to add new content types to the `qa` and `master` environments:

```bash
$ contentful space migration --s $SPACE_ID --e qa contentful/content-types/currentSchoolBlock.js
```

Upon success, you'll see:

```bash
The following migration has been planned

Environment: qa

Create Content Type currentSchoolBlock
  - name: "Current School Block"
  - description: "Displays the user's current school, or allows them to select it if not set."
  - displayField: "internalTitle"

  Create field internalTitle
    - name: "Internal Title"
    - type: "Symbol"
    - localized: false
    - required: true
    - validations: []
    - disabled: false
  ...
```

You'll be prompted whether to run the migration. Upon answering yes:

```bash
? Do you want to apply the migration Yes
 ✔ Create Content Type currentSchoolBlock
 ✔ Update field controls for Content Type currentSchoolBlock
🎉  Migration successful
```

## Notes

The migrations found in the `contentful/migrations` directory are from an earlier iteration of this workflow. We no longer add migrations here, but these files [do have value in the sense that they track migrations/content types which haven’t been ported over yet over to the `content-types` dir](https://dosomething.slack.com/archives/CP2D7UGAU/p1578081688027000?thread_ts=1577991900.006100&cid=CP2D7UGAU).
