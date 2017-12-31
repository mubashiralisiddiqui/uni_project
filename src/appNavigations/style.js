export const DrawerStyles = {
    drawerContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
    },
    drawerHeader: {
        width: '100%',
        display: 'flex',
        height: 50,
        backgroundColor: '#339cc9',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    drawerHeaderText: {
        fontSize: 20,
        color: 'white'
    },
    TabContainer: {
        flex: 1
    },
    drawerFooter: {
        width: '100%',
        display: 'flex',
        height: 70,
        backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        zIndex: 0,
        position: 'absolute',
        bottom: 0
    },
    drawerFooterAddButton:{
        display: 'flex',
        flexDirection: 'row',
        width: 110
    },
    drawerFooterAddIcon: {
        marginRight: 10
    },
    drawerFooterAddText: {
        fontSize:15,
        color: 'white'
    },
    drawerSendButton: {
        backgroundColor: 'black',
        borderWidth: 0.5,
        borderColor: '#D1D1D1',
        height: 50,
    }
}