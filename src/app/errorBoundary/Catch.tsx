/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

type TErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type TErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error,
) => React.ReactNode;
type TErrorState = { error?: Error };
export interface IAppErrorBoundary {
  children: React.ReactNode;
}

function Catch<Props extends {}>(
  component: TErrorHandlingComponent<Props>,
  errorHandler?: TErrorHandler,
): React.ComponentType<Props> {
  return class extends Component<Props, TErrorState> {
    // eslint-disable-next-line react/state-in-constructor
    state: TErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      return component(this.props, this.state.error);
    }
  };
}

export default Catch;
