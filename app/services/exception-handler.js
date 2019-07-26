import { set, get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({

  flashMessages: service('flash-messages'),

  exceptionTypes:Object.freeze({
    communication: 'Ocorreu uma falha de comunicação com o servidor.',
    authenticaton: 'Email ou sua senha inválido, por favor tente novamente.',
    validation: 'Existem campos com problemas, verifique!',
    genericValidation: '',
    backendError: 'Ocorreu um erro no servidor.',
    unknow: 'Ocorreu uma exceção desconhecida.'
  }),

  handle(exception, changeset=null){
    let exceptionOptions = this.getExceptionOptions(exception, changeset);
    let exceptionType = this.getExceptionType(exceptionOptions);
    let exceptionHandler = this.getExceptionHandler(exceptionType).bind(this);
    exceptionHandler(exception, changeset);
  },

  getExceptionOptions(exception, changeset){
    let exceptionOptions = {};
    set(exceptionOptions, 'hasException', !!exception);
    set(exceptionOptions, 'hasChangeset', !!changeset);
    let hasException = get(exceptionOptions, 'hasException');
    if(hasException){
      set(exceptionOptions, 'hasMessage', get(exception, 'message') || get(exception, 'json.message'));
      set(exceptionOptions, 'hasError', get(exception, 'error') || get(exception, 'json.error'));
      set(exceptionOptions, 'hasErrors', get(exception, 'errors') || get(exception, 'json.errors'));

      set(exceptionOptions, 'error', get(exception, 'error') || get(exception, 'json.error'));
      set(exceptionOptions, 'errors', get(exception, 'errors') || get(exception, 'json.errors'));
      let hasErrors = get(exceptionOptions, 'hasErrors');
      if(hasErrors){
        let error = hasErrors[0];
        set(exceptionOptions, 'hasDetail', get(error, 'detail'));
        set(exceptionOptions, 'hasSource', get(error, 'source'));
        set(exceptionOptions, 'hasStatus', get(error, 'status'));
        set(exceptionOptions, 'hasTitle', get(error, 'title'));
      }
    }
    return exceptionOptions;
  },

  getExceptionType(exceptionOptions){
    let { hasException, hasError, hasMessage, hasDetail, hasSource, hasStatus, hasChangeset, hasTitle } = exceptionOptions;
    if(hasChangeset && hasDetail && hasSource){
      return 'validation';
    }else if(hasDetail && hasSource){
      return 'genericValidation';
    }else if(hasDetail && hasTitle && hasStatus){
      return 'backendError';
    }else if(hasMessage && hasError){
      return 'authenticaton';
    }else if(hasDetail && hasTitle || !hasException){
      return 'communication';
    }else if(hasDetail){
      return 'genericValidation';
    }
    return 'unknow';
  },

  getExceptionHandler(exceptionType) {
    switch(exceptionType){
      case 'validation':
        return this.handleValidationException;
      case 'communication':
        return this.handleCommunicationException;
      case 'authenticaton':
        return this.handleAuthenticatonException;
      case 'backendError':
        return this.handleBackendErrorException;
      case 'genericValidation':
        return this.handleGenericValidationException;
      default:
        return this.handleUnknowException;
    }
  },

  handleValidationException(exception, changeset){
    let flashMessages = get(this, 'flashMessages');
    let message = this.getExceptionMessage('validation');
    flashMessages.add({message});
    this.pushErrorsToChangeset(exception, changeset);
  },

  handleCommunicationException(){
    let flashMessages = get(this, 'flashMessages');
    let message = this.getExceptionMessage('communication');
    flashMessages.add({message});
  },

  handleAuthenticatonException(){
    let flashMessages = get(this, 'flashMessages');
    let message = this.getExceptionMessage('authenticaton');
    flashMessages.add({message});
  },

  handleBackendErrorException(exception){
    let flashMessages = get(this, 'flashMessages');
    let message = this.getExceptionMessage('backendError');
    let errors = '';
    if (exception.errors) {
      errors = exception.errors;
    } else {
      errors = get(exception, 'json.errors');
    }
    const error = errors[0];
    const { status } = error;
    message += ' Código do erro: '+status;
    // if (error.detail) {
    //   message += '\n'+error.detail;
    // }
    flashMessages.add({message});
  },

  handleGenericValidationException(exception){
    const { errors } = exception.json;
    let error = errors[0];
    let { detail } = error;
    let flashMessages = get(this, 'flashMessages');
    flashMessages.add({message: detail});
  },

  handleUnknowException(){
    let flashMessages = get(this, 'flashMessages');
    let message = this.getExceptionMessage('unknow');
    flashMessages.add({message});
  },

  pushErrorsToChangeset(exception, changeset){
    const { errors } = exception;
    errors.forEach((error) => {
      let { source, detail } = error;
      let { pointer } = source;
      let attribute = pointer.split('/').pop();
      changeset.pushErrors(attribute, detail);
    });
  },

  getExceptionMessage(exceptionType){
    let exceptionTypes = get(this,'exceptionTypes');
    let message = get(exceptionTypes, exceptionType);
    return message;
  }

});
