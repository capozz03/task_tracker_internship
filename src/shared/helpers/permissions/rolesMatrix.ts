import { TConditions } from './types';

export const rolesMatrix = {
  'delete.task': {
    availableToRoles: ['author'],
  } as TConditions,

  'duplicate.task': {
    availableToRoles: ['author'],
  } as TConditions,

  'duplicate/edit.task': {
    availableToRoles: ['author'],
  } as TConditions,

  'change.title': {
    availableToRoles: ['author'],
  } as TConditions,

  'change.description': {
    availableToRoles: ['author'],
  } as TConditions,

  'change.status': {
    availableToRoles: ['author', 'performer', 'responsible'],
  } as TConditions,

  'change.performer': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'change.dateStart': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'change.dateStop': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'change.priority': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'change.tag': {
    availableToRoles: ['author', 'performer', 'responsible'],
  } as TConditions,

  'change.responsible': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'change.observer': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'add/change/remove.checklist': {
    availableToRoles: ['author', 'performer', 'responsible'],
  } as TConditions,

  'add/change/remove.checkbox': {
    availableToRoles: ['author', 'performer', 'responsible'],
  } as TConditions,

  'add/remove.file': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,

  'get.alertNeedResume': {
    availableToRoles: ['responsible'],
  } as TConditions,

  'add/remove.resume': {
    availableToRoles: ['author', 'responsible'],
  } as TConditions,
};
