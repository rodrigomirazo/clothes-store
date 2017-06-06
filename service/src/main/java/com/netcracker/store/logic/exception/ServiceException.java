package com.netcracker.store.logic.exception;

/**
 * Created by A-one on 06.06.2017.
 */
public class ServiceException extends RuntimeException {
    private static final long serialVersionUID = -996740847558373872L;

    public ServiceException() {
        super();
    }

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public ServiceException(Throwable cause) {
        super(cause);
    }
}