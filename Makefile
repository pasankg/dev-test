#!/usr/bin/make -f

APP_ROOT=$(PWD)/app
APP_URL=http://127.0.0.1
DB_URL=mysql://drupal:drupal@127.0.0.1/local
DRUSH=./bin/drush -r $(APP_ROOT) -l $(APP_URL)
GULP=node --max-old-space-size=512 ./node_modules/.bin/gulp
NIGHTWATCH=$(CURDIR)/node_modules/.bin/nightwatch -c tests/nightwatch.json
COMPOSER=composer
YARN=yarn
PHPCBF=./bin/phpcbf
PHPCS=./bin/phpcs

CONFIG_DIR=$(CURDIR)/config-export
CONFIG_DELETE=$(CURDIR)/drush/config-delete.yml
CONFIG_IGNORE=$(CURDIR)/drush/config-ignore.yml
CONFIG_INSTALL=$(CURDIR)/config-install

PHPCS_FOLDERS=./app/modules/custom
PHPCS_EXTENSIONS=php,module,inc,install,test,profile,theme

.DEFAULT_GOAL := list

default: list;

deploy: updb config-import cache-rebuild

config-import:
	$(DRUSH) -r app pm:enable -y drush_cmi_tools
	$(DRUSH) cimy -y  --source=$(CONFIG_DIR) --install=$(CONFIG_INSTALL) --delete-list=$(CONFIG_DELETE)

config-export:
	$(DRUSH) -r app pm:enable -y drush_cmi_tools
	$(DRUSH) cexy -y --destination=$(CONFIG_DIR) --ignore-list=$(CONFIG_IGNORE)

cache-rebuild:
	$(DRUSH) cache:rebuild

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1n}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

init:
	composer install --prefer-dist --no-progress --no-suggest --no-interaction --optimize-autoloader

devify:
	chmod -R +w $(APP_ROOT)/sites/default
	mkdir -p $(APP_ROOT)/sites/default/files/private
	cp settings.local.php $(APP_ROOT)/sites/default/settings.php

install: init mkdirs devify
	$(DRUSH) si -y

mkdirs:
	mkdir -p $(APP_ROOT)/sites/default/files/tmp $(APP_ROOT)/sites/default/files/private

updb:
	$(DRUSH) updb -y

entity-updates:
	$(DRUSH) entity:updates -y

fix-php:
	$(PHPCBF) --report=full --standard=vendor/drupal/coder/coder_sniffer/Drupal/ruleset.xml --extensions=$(PHPCS_EXTENSIONS) $(PHPCS_FOLDERS)

lint-php: psalm
	$(PHPCS) --report=full --standard=vendor/drupal/coder/coder_sniffer/Drupal/ruleset.xml --extensions=$(PHPCS_EXTENSIONS) $(PHPCS_FOLDERS)

test:
	./bin/phpunit

login:
	$(DRUSH) uli

fix-php: phpcbf

lint-php: phpcs

styleguide:
	$(GULP) build


.PHONY: list build init mkdirs updb entity-updates cache-rebuild styleguide db-sync config-import config-export phpcbf phpcs test-init login default
