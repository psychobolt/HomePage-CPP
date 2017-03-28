import {OpaqueToken} from '@angular/core';

export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');

// actions
export * from './actions';

// services
export * from './services';

// state
export * from './states';

// models
export * from './models';
