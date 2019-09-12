const sequelize = require('./utils/database')

const app = require('./app')
const port = process.env.PORT || 5000


async function start() {
    try{
        await sequelize.sync()
        app.listen(port, () => console.log(`Server has been started on ${port}`))
    }catch(e){
        console.log('Error',e)
    }
}

start()

