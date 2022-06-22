require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    for (let blog of blogs) {
      const { author, title, likes } = blog;
      console.log(`${author}: '${title}', ${likes} likes`)
    }
    await sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
