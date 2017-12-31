import { connect } from 'react-redux';
import AppNavigation from './appNavigation';
import * as ReactNavigation from 'react-navigation';

const ReduxNavigation = (props) => {
    const { dispatch, nav } = props;
    const navigation = ReactNavigation.addNavigationHelpers({
        dispatch,
        state: nav
    })
    return <AppNavigation navigation={navigation} />
}
const mapStateToProps= state=>({nav:state.nav})
// const mapDispatchToProps= (dispatch)=>{

// }

export default connect (mapStateToProps)(ReduxNavigation)