<?php
namespace Drupal\react_components\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'ReactBlock' block.
 *
 * @Block(
 * id = "react_block",
 * admin_label = @Translation("React block"),
 * )
 */
class ReactBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    
    $build = [];

    $uuid = \Drupal::service('uuid')->generate();
    $settingsKey = 'rc-block-' . $uuid;

    $build['react_block'] = [
      '#markup' => '<div id="' . $uuid . '"></div>',
      '#theme' => 'react_block',
      '#uuid' => $uuid,
      '#attributes' => [
        'data-instance-id' => $uuid,
      ],
      '#attached' => [
        'library' => 'react_components/react-components-lib'
      ]
    ];

    $build['react_block']['#attached']['drupalSettings']['reactComponents'][$settingsKey] = [
      'block_uuid' => $uuid,
      'componentType' => $this->configuration['component_type'],
      'title' => $this->configuration['component_title']
    ];

    return $build;
  }

  public function defaultConfiguration() {
    return [
      'id' => $this->getPluginId(),
      'label' => '',
      'label_display' => 'visible',
      'provider' => 'react_components',
      'component_type' => '',
      'component_title' => ''
    ];
  }

  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    // Component Title
    $form['component_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Component Title'),
      '#description' => $this->t('Optional title for the component.'),
      '#default_value' => $this->configuration['component_title'],
      '#maxlength' => 255,
    ];

    // Component Type Dropdown
    $form['component_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Component Type'),
      '#description' => $this->t('Select the type of React component to render.'),
      '#options' => [
        'hello_world' => $this->t('Hello World'),
        'sample_component' => $this->t('Sample Component')
      ],
      '#default_value' => $this->configuration['component_type'],
      '#required' => TRUE,
    ];

    return $form;
  }

  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    
    $this->configuration['component_type'] = $form_state->getValue('component_type');
    $this->configuration['component_title'] = $form_state->getValue('component_title');
  }

  // Uncomment these if adding a new component doesn't work
  // public function getCacheMaxAge() {
  //   return 0; // Temporarily disable caching
  // }

  // public function getCacheContexts() {
  //   return ['url.path']; // Add cache contexts as needed
  // }

  // public function getCacheTags() {
  //   return ['react_components:debug']; // Add cache tags
  // }
}
