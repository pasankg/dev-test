A demonstration of a simple import of an online JSON source.

REQUIREMENTS
============
You need the contrib modules Migrate Plus and Migrate Tools.
Internet access.

USAGE
=====
Enable the module, check status, import all products and rollback with Drush
drush en migrate_articles
drush migrate-status
drush migrate-import article
drush migrate-rollback article

See config/optional/migrate_plus.migration.product.yml for details about the
migration.

Thanks to Jeff Geerling and Christophe for the original code:
- https://www.jeffgeerling.com/blog/2016/migrate-custom-json-feed-drupal-8-migrate-source-json
- https://colorfield.be/blog/drupal-8-json-custom-migration
