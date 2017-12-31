import AppNavigation from '../../appNavigations/appNavigation';

const navReducer = (state, action) => {
    newState = AppNavigation.router.getStateForAction(action, state)
    return newState || state
}
export default navReducer