<?php

namespace Drupal\anonpost\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configuration form definition for the anonymous messages.
 */
class AnonpostConfigurationForm extends ConfigFormBase {

    /**
     * @var \Drupal\Core\Logger\LoggerChannelInterface
     */
    protected $logger;
  
    /**
     * AnonpostConfigurationForm constructor.
     *
     * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
     *   The factory for configuration objects.
     * @param \Drupal\Core\Logger\LoggerChannelInterface $logger
     *   The logger.
     */
    public function __construct(ConfigFactoryInterface $config_factory, LoggerChannelInterface $logger) {
      parent::__construct($config_factory);
      $this->logger = $logger;
    }
  
    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      return new static(
        $container->get('config.factory'),
        $container->get('anonpost.logger.channel.anonpost')
      );
    }
  
  
    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames() {
      return ['anonpost.customize_messages'];
    }
  
    /**
     * {@inheritdoc}
     */
    public function getFormId() {
      return 'anonmessages_configuration_form';
    }
  
    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
      $config = $this->config('anonpost.customize_messages');
      $form['firstusermsg'] = array(
        '#type' => 'textarea',
        '#title' => $this->t('Message body to user on post creation'),
        '#default_value' => $config->get('firstusermsg'),
      
      );
      
  
      $form['anonmessages'] = array(
        '#type' => 'textfield',
        '#title' => $this->t('Message'),
        '#description' => $this->t('Please provide the message you want to use.'),
        '#default_value' => $config->get('anonmessages'),
      );
  
      return parent::buildForm($form, $form_state);
    }
  
    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
      $this->config('anonpost.customize_messages')
        ->set('anonmessages', $form_state->getValue('anonmessages'))
        ->set('firstusermsg', $form_state->getValue('firstusermsg'))
        ->save();
  
      parent::submitForm($form, $form_state);
  
      $this->logger->info('The Anonpost message has been changed to @message.', ['@message' => $form_state->getValue('anonmessages')]);
    }
  
  }