# Dev Test Project

Drupal 8

## Installation

This project is a forked from https://github.com/previousnext/drupal-project

This project needs additional files after cloning.
* Extract htaccess.zip file into app root
* Extract sites-default.zip file into app/sites/default folder

If you want please remove the development configurations from these files because caching is disabled for ease of development.

1). 
```
alias dc='docker-compose -f docker-compose.osx.yml'
```

To start the container, run:

```bash
dc up -d
dc exec app bash
```

2).
With in the container
```bash
composer install
```

3).
Import the database at root
```bash
gunzip -c DATABSE_NAME.sql.gz | drush sqlc
```

4).
Import the configurations
```bash
make deploy
```

Further commands can be listed using 
```bash
make list
```

5).
I have setup gulp for this project.
```bash
make styleguide
```

Gulp build will compile all the styles inside the custom theme folder
```bash
gulp build
```

style guide path is `app/themes/dev_test_theme/css/style-guide` (WIP)

## Assumpotions
* `id` field is only used for development purposes hence not displayed for logged in users who has access to admin panel.

* Since the `source` attribute in the json file is has repeated data it will be saved as terms in a taxonomy called Source.
