
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { ToastAndroid } from 'react-native'
import { AuthAction } from '../actions/authAction'


export function supplierSignup(obj, navigate) {
    console.log('obj', obj)
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(obj.email, obj.pasword)
            .then(user => {
                var userId = firebase.auth().currentUser.uid;
                let userDetails = {
                    userId: userId,
                    email: obj.email,
                    name: obj.name,
                    role: "supplier"
                };
                firebase
                    .database()
                    .ref("users/" + userId)
                    .set(userDetails).then(() => {
                        navigate("SupplierLoginScreen");
                        ToastAndroid.show("SIGNUP SUCCESSFUL !", ToastAndroid.SHORT);
                    }).catch((error) => {
                        console.log("Error during user creating on firebase", error);
                    });
            }).catch((err) => {
                alert(err)
            })
    }
}

export function shopkeeperSignup(obj, navigate) {
    console.log('obj', obj)
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(obj.email, obj.pasword)
            .then(user => {
                var userId = firebase.auth().currentUser.uid;
                let userDetails = {
                    userId: userId,
                    email: obj.email,
                    name: obj.name,
                    role: "shopkeeper"
                };
                firebase
                    .database()
                    .ref("users/" + userId)
                    .set(userDetails).then(() => {
                        navigate("ShopKeeperLoginScreen");
                        ToastAndroid.show("SIGNUP SUCCESSFUL !", ToastAndroid.SHORT);
                    }).catch((error) => {
                        console.log("Error during user creating on firebase", error);
                    });

            }).catch((err) => {
                alert(err)
            })
    }
}


export const supplierLogin = (obj, navigate) => {
    console.log("obj from actions", obj)
    return dispatch => {

        firebase.auth().signInWithEmailAndPassword(obj.email, obj.pasword)
            .then((user) => {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + userId).on('value', (data) => {
                    var obj = data.val();
                    if(obj.role==='supplier'){
                        dispatch(AuthAction.login_success(user))
                        navigate('SupplierDashBoardScreen');
                        ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
                    }
                    else{
                        ToastAndroid.show('IncorrectInfo !', ToastAndroid.SHORT);
                    }
                 

                })
               
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}
export const shopkeeperlogin = (obj, navigate) => {
    return dispatch => {
        firebase.auth()
            .signInWithEmailAndPassword(obj.email, obj.pasword)
            .then((user) => {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + userId).on('value', (data) => {
                    var obj = data.val();
                    console.log('usershpkeepeer', obj.role)
                    if(obj.role==='shopkeeper'){
                        dispatch(AuthAction.shopkeeperDetail(obj))
                        navigate('ShopKeeperDashBoardScreen');
                        ToastAndroid.show("Login SUCCESSFUL !", ToastAndroid.SHORT);
                    }
                  else{
                    ToastAndroid.show("Incorrect Info !", ToastAndroid.SHORT)
                  }
                   
                })
             
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

}