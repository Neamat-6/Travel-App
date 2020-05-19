export class User {

    constructor(name, password) {
        this.name = name
        this.password = password
        this.logged = true
    }

    storeUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    getUserName() {
        return JSON.parse(localStorage.getItem('user')).name
    }

    loggedIn(logged){
        this.logged = logged
        return this.logged
    }
}

export function toggleLog(value) {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    localStorage.setItem('user', JSON.stringify({...storedUser,logged:value}))
}