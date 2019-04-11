<?php

namespace Drupal\migrate_articles\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Converts ISO 8601 to unixtimestamp.
 *
 * @MigrateProcessPlugin(
 *   id = "article_date_converter",
 * )
 */
class ArticleDateConverter extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!empty($value)) {
      return date("U",strtotime($value));
    }
  }

}
