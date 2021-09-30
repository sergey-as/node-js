const createUser = (name, age) => {
    return {
        name,
        age,
        greeting: () => {
            console.log(`Hello, my name ${name}`);
        }
    }
}

function dropDataBase() {
    console.log('DATABASE IS DROPPED');
}

dropDataBase();

module.exports = {
    createUser,
    xxx: function () {
        console.log('xxx function');
    }
}