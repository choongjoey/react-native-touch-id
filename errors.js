const { codes, errors } = require('./data/errors');

class TouchIDError extends Error {
  constructor(name, details, code) {
    super();
    this.name = name || 'TouchIDError';
    this.message = details.message || 'Touch ID Error';
    this.details = details || {};
    this.code = code;
  }
}

class TouchIDUnifiedError extends Error {
  constructor(error, biometryType) {
    super();
    this.name = 'TouchIDError';
    this.message = error.message;
    this.biometryType = biometryType;
    this.code = error.code;
  }
}

const getError = (code) => {
  switch (code) {
  case codes.iOSCodes.LAErrorAuthenticationFailed:
  case codes.androidModuleCodes.AUTHENTICATION_FAILED:
    return errors.AUTHENTICATION_FAILED;

  case codes.iOSCodes.LAErrorUserCancel:
  case codes.androidApiCodes.FINGERPRINT_ERROR_USER_CANCELED:
  case codes.androidModuleCodes.AUTHENTICATION_CANCELED:
    return errors.USER_CANCELED;

  case codes.iOSCodes.LAErrorSystemCancel:
  case codes.androidApiCodes.FINGERPRINT_ERROR_CANCELED:
    return errors.SYSTEM_CANCELED;

  case codes.iOSCodes.LAErrorTouchIDNotAvailable: // DEPRECATED does this mean hw not present rather than not available?
  case codes.iOSCodes.LAErrorBiometryNotAvailable: // handle new LAError
  case codes.androidApiCodes.FINGERPRINT_ERROR_HW_UNAVAILABLE:
  case codes.androidModuleCodes.NOT_AVAILABLE:
    return errors.NOT_AVAILABLE;

  case codes.iOSCodes.RCTTouchIDNotSupported:
  case codes.androidModuleCodes.NOT_SUPPORTED:
    return errors.NOT_SUPPORTED;

  case codes.iOSCodes.LAErrorTouchIDNotEnrolled: // DEPRECATED
  case codes.iOSCodes.LAErrorBiometryNotEnrolled:
  case codes.androidApiCodes.FINGERPRINT_ERROR_NO_FINGERPRINTS:
  case codes.androidModuleCodes.NOT_ENROLLED:
    return errors.NOT_ENROLLED;

  // android only
  case codes.androidApiCodes.FINGERPRINT_ERROR_TIMEOUT:
    return errors.TIMEOUT;

  case codes.androidApiCodes.FINGERPRINT_ERROR_UNABLE_TO_PROCESS:
    return errors.PROCESSING_ERROR;

  case codes.androidApiCodes.FINGERPRINT_ERROR_LOCKOUT:
    return errors.LOCKOUT;

  case codes.androidApiCodes.FINGERPRINT_ERROR_LOCKOUT_PERMANENT:
    return errors.LOCKOUT_PERMANENT;

  case codes.androidApiCodes.FINGERPRINT_ERROR_HW_NOT_PRESENT:
  case codes.androidModuleCodes.NOT_PRESENT:
    return errors.NOT_PRESENT;

    // ios only
  case codes.iOSCodes.LAErrorPasscodeNotSet:
    return errors.FALLBACK_NOT_ENROLLED;

  case codes.iOSCodes.LAErrorUserFallback:
    return errors.USER_FALLBACK;

  case codes.iOSCodes.LAErrorTouchIDLockout: // DEPRECATED
  case codes.iOSCodes.LAErrorBiometryLockout:
    return errors.LOCKOUT;

  case codes.iOSCodes.LAErrorInvalidContext:
  case codes.iOSCodes.LAErrorNotInteractive:
    return errors.PROCESSING_ERROR;

  default:
    return errors.UNKNOWN_ERROR;
  }
};

module.exports = {
  getError,
  TouchIDError,
  TouchIDUnifiedError
};
