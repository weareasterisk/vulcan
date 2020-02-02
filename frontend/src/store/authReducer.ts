export const SAVE_TOKEN = "vulcan/auth/SAVE_TOKEN"
export const CLEAR_AUTH = "vulcan/auth/CLEAR_AUTH"
export const SILENT_REFRESH = "vulcan/auth/SILENT_REFRESH"
const DEFAULT_ACTION_TYPE = ""

export interface AuthAction {
  type: typeof SAVE_TOKEN | typeof CLEAR_AUTH | typeof SILENT_REFRESH | typeof DEFAULT_ACTION_TYPE
  payload: string
}

export interface AuthState {
  token: string
  user: {}
}

const defaultState: AuthState = {
  token: "",
  user: {},
}
const defaultAction: AuthAction = {
  type: DEFAULT_ACTION_TYPE,
  payload: "",
}

export default function authReducer(
  state: AuthState = defaultState,
  action: AuthAction = defaultAction
): AuthState {
  switch (action.type) {
    case SAVE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
