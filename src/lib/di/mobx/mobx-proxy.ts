import {
  makeAutoObservable as mobxMakeAutoObservable,
  makeObservable as mobxMakeObservable,
  observable as mobxObservable,
  observe as mobxObserve,
} from "mobx"

import type { Lambda as MobxLambda } from "mobx"

export const makeAutoObservable = mobxMakeAutoObservable
export const makeObservable = mobxMakeObservable
export const observable = mobxObservable
export const observe = mobxObserve

export type Lambda = MobxLambda
